import { passphraseOk } from '@/lib/ai/server/passphrase';
import { MAX_SNAPSHOT_BYTES, readSnapshot, resetSnapshot, syncDir, writeSnapshot } from '@/lib/sync/server';

/** Off unless SYNC_DATA_DIR is set; only turn it on behind a login or with APP_PASSPHRASE. */
const ETAG = 'x-sync-etag';

function reply(status: number, etag?: string, body?: BodyInit, type?: string) {
  const headers: Record<string, string> = { 'Cache-Control': 'no-store' };
  if (etag) headers[ETAG] = etag;
  if (type) headers['Content-Type'] = type;
  return new Response(body ?? null, { status, headers });
}

function refuse(request: Request): Response | undefined {
  if (!syncDir()) return reply(404);
  if (!passphraseOk(request)) return reply(401);
}

/** Stops reading as soon as the upload is too large, so it can't fill the server's memory. */
async function readLimited(request: Request): Promise<Uint8Array | null> {
  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  while (reader) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > MAX_SNAPSHOT_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }
  return Buffer.concat(chunks);
}

export async function GET(request: Request) {
  const refused = refuse(request);
  if (refused) return refused;
  const { etag, data } = await readSnapshot(syncDir()!);
  if (request.headers.get(ETAG) === etag) return reply(304, etag);
  return data ? reply(200, etag, new Uint8Array(data), 'application/gzip') : reply(204, etag);
}

export async function PUT(request: Request) {
  const refused = refuse(request);
  if (refused) return refused;
  // other websites can't send this content type without the browser asking permission first
  if (request.headers.get('content-type') !== 'application/gzip') return reply(415);
  if (Number(request.headers.get('content-length') ?? 0) > MAX_SNAPSHOT_BYTES) return reply(413);
  const data = await readLimited(request);
  if (!data) return reply(413);
  if (data[0] !== 0x1f || data[1] !== 0x8b) return reply(400);
  const { ok, etag } = await writeSnapshot(syncDir()!, data, request.headers.get(ETAG));
  return reply(ok ? 200 : 409, etag);
}

export async function DELETE(request: Request) {
  const refused = refuse(request);
  if (refused) return refused;
  const { etag } = await resetSnapshot(syncDir()!);
  return reply(200, etag);
}
