import { Fragment } from 'react';
import type { DiffResult } from '@/lib/text/diff';

/** Shows the learner's answer against the reference, word by word. */
export function DiffView({ diff }: { diff: DiffResult }) {
  return (
    <div className="space-y-1">
      <p className="leading-loose" lang="de">
        {diff.ops.map((op, i) => (
          <Fragment key={i}>
            {i > 0 && ' '}
            {op.type === 'equal' && (
              <span
                className={op.caseError || op.umlaut ? 'underline decoration-warning decoration-wavy underline-offset-4' : ''}
                title={op.caseError ? 'Capitalisation' : op.umlaut ? `Write ${op.expected}` : undefined}
              >
                {op.caseError || op.umlaut ? op.expected : op.actual}
              </span>
            )}
            {op.type === 'wrong' && (
              <span>
                <s className="text-danger">{op.actual}</s> <span className="font-semibold text-success">{op.expected}</span>
              </span>
            )}
            {op.type === 'missing' && <span className="rounded bg-success-soft px-1 font-semibold text-success">{op.expected}</span>}
            {op.type === 'extra' && <s className="text-danger">{op.actual}</s>}
          </Fragment>
        ))}
      </p>
      {(diff.caseErrors > 0 || diff.umlautSubstitutes > 0) && (
        <p className="text-xs text-muted">
          {diff.caseErrors > 0 && 'Wavy line: check capitalisation (all nouns start with a capital letter). '}
          {diff.umlautSubstitutes > 0 && 'ae/oe/ue/ss were accepted for ä/ö/ü/ß.'}
        </p>
      )}
    </div>
  );
}
