import { createHash, timingSafeEqual } from 'node:crypto';

/** Constant-time comparison; hashing first makes both sides the same length. */
function samePassphrase(given: string, expected: string): boolean {
  const digest = (s: string) => createHash('sha256').update(s).digest();
  return timingSafeEqual(digest(given), digest(expected));
}

/** True when no APP_PASSPHRASE is set or the request carries the right one. */
export function passphraseOk(request: Request): boolean {
  const passphrase = process.env.APP_PASSPHRASE;
  return !passphrase || samePassphrase(request.headers.get('x-app-passphrase') ?? '', passphrase);
}
