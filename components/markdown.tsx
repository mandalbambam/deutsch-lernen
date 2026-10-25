import { Fragment, type ReactNode } from 'react';

/**
 * Tiny Markdown renderer for the app's own (trusted) lesson texts:
 * paragraphs, ### headings, - lists, | tables |, > notes, **bold**, *italic*, `de` code spans.
 * No HTML is ever injected.
 */
function inline(text: string, keyBase: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g;
  let last = 0;
  let i = 0;
  for (const m of text.matchAll(re)) {
    const idx = m.index ?? 0;
    if (idx > last) out.push(<Fragment key={`${keyBase}-t${i++}`}>{text.slice(last, idx)}</Fragment>);
    const tok = m[0];
    if (tok.startsWith('**')) out.push(<strong key={`${keyBase}-b${i++}`}>{tok.slice(2, -2)}</strong>);
    else if (tok.startsWith('`'))
      out.push(
        <span key={`${keyBase}-c${i++}`} lang="de" className="rounded bg-surface-2 px-1 font-medium">
          {tok.slice(1, -1)}
        </span>,
      );
    else out.push(<em key={`${keyBase}-i${i++}`}>{tok.slice(1, -1)}</em>);
    last = idx + tok.length;
  }
  if (last < text.length) out.push(<Fragment key={`${keyBase}-t${i++}`}>{text.slice(last)}</Fragment>);
  return out;
}

type SegmentKind = 'h' | 'table' | 'list' | 'note' | 'p';

function kindOf(line: string): SegmentKind {
  const t = line.trim();
  if (t.startsWith('### ')) return 'h';
  if (t.startsWith('|')) return 'table';
  if (/^[-•]\s/.test(t)) return 'list';
  if (t.startsWith('>')) return 'note';
  return 'p';
}

/** Splits a block into runs of lines of the same kind (e.g. a bold label directly followed by a table). */
function segments(block: string): { kind: SegmentKind; lines: string[] }[] {
  const out: { kind: SegmentKind; lines: string[] }[] = [];
  for (const raw of block.split('\n')) {
    const line = raw.trimEnd();
    if (!line.trim()) continue;
    const kind = kindOf(line);
    const last = out[out.length - 1];
    if (last && last.kind === kind && kind !== 'h') last.lines.push(line);
    else out.push({ kind, lines: [line] });
  }
  return out;
}

function Table({ lines, k }: { lines: string[]; k: string }) {
  const rows = lines
    .filter((l) => !/^\|\s*:?-{2,}/.test(l.trim()))
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim()),
    );
  const [head, ...body] = rows;
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-max border-collapse text-sm">
        <thead>
          <tr>
            {head.map((c, ci) => (
              <th key={ci} className="border-b border-line bg-surface-2 px-3 py-1.5 text-left font-semibold">
                {inline(c, `${k}h${ci}`)}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {body.map((r, ri) => (
            <tr key={ri}>
              {r.map((c, ci) => (
                <td key={ci} className="border-b border-line px-3 py-1.5" lang="de">
                  {inline(c, `${k}r${ri}c${ci}`)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Markdown({ text, className }: { text: string; className?: string }) {
  const blocks = text.trim().split(/\n\s*\n/);
  return (
    <div className={['space-y-3 leading-relaxed', className].filter(Boolean).join(' ')}>
      {blocks.flatMap((block, bi) =>
        segments(block).map((seg, si) => {
          const key = `b${bi}s${si}`;
          switch (seg.kind) {
            case 'h':
              return (
                <h3 key={key} className="pt-1 text-base font-semibold">
                  {inline(seg.lines[0].trim().slice(4), key)}
                </h3>
              );
            case 'table':
              return <Table key={key} lines={seg.lines} k={key} />;
            case 'list':
              return (
                <ul key={key} className="list-disc space-y-1 pl-5">
                  {seg.lines.map((l, li) => (
                    <li key={li}>{inline(l.trim().replace(/^[-•]\s/, ''), `${key}l${li}`)}</li>
                  ))}
                </ul>
              );
            case 'note':
              return (
                <div key={key} className="rounded-xl border-l-4 border-accent bg-accent-soft px-4 py-2.5 text-sm">
                  {inline(seg.lines.map((l) => l.trim().replace(/^>\s?/, '')).join(' '), key)}
                </div>
              );
            default:
              return <p key={key}>{inline(seg.lines.join(' '), key)}</p>;
          }
        }),
      )}
    </div>
  );
}
