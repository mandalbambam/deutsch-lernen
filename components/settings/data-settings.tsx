'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Database, Download, HardDriveDownload, RefreshCw, Trash2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardTitle } from '@/components/ui/card';
import { Notice, ProgressBar } from '@/components/ui/misc';
import { useToast } from '@/components/ui/toast';
import { backupSummary, deleteAllData, downloadBackup, importBackup, parseBackup, type Backup } from '@/lib/backup';
import { allDataUrls } from '@/lib/data/load';
import { formatDate } from '@/lib/format';
import { useLang } from '@/lib/i18n';
import { replaceEverywhere, syncNow, useSyncStatus } from '@/lib/sync/client';

function mb(bytes: number) {
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

/** Backup (export/import), offline download and deleting all data. */
export function DataSettings() {
  const toast = useToast();
  const lang = useLang();
  const router = useRouter();
  const sync = useSyncStatus();
  const fileRef = useRef<HTMLInputElement>(null);
  const [pending, setPending] = useState<{ backup: Backup; name: string } | null>(null);
  const [confirmReplace, setConfirmReplace] = useState(false);
  const [importError, setImportError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [offline, setOffline] = useState<{ done: number; total: number; failed: number } | null>(null);
  const [storage, setStorage] = useState<{ usage: number; quota: number; persisted: boolean } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const readFile = async (file: File) => {
    setImportError(null);
    setConfirmReplace(false);
    try {
      setPending({ backup: parseBackup(await file.text()), name: file.name });
    } catch (err) {
      setPending(null);
      setImportError((err as Error).message);
    }
  };

  const runImport = async (mode: 'replace' | 'merge') => {
    if (!pending) return;
    setBusy(true);
    try {
      const n = await importBackup(pending.backup, mode);
      if (mode === 'replace') await replaceEverywhere();
      else void syncNow();
      toast({ message: mode === 'replace' ? `Backup restored (${n} records).` : `Backup merged (${n} records added or updated).`, tone: 'success' });
      setPending(null);
      setConfirmReplace(false);
    } catch (err) {
      setImportError(`Import failed: ${(err as Error).message}`);
    } finally {
      setBusy(false);
    }
  };

  const downloadAll = async () => {
    const urls = await allDataUrls();
    let failed = 0;
    setOffline({ done: 0, total: urls.length, failed: 0 });
    // the service worker stores every /data file it serves
    for (let i = 0; i < urls.length; i++) {
      const ok = await fetch(urls[i]).then((r) => r.ok, () => false);
      if (!ok) failed++;
      setOffline({ done: i + 1, total: urls.length, failed });
    }
    const persisted = (await navigator.storage?.persist?.().catch(() => false)) ?? false;
    const est = await navigator.storage?.estimate?.().catch(() => undefined);
    if (est) setStorage({ usage: est.usage ?? 0, quota: est.quota ?? 0, persisted });
    toast({ message: failed ? `${failed} files could not be downloaded — check your connection.` : 'Everything is stored for offline use.', tone: failed ? 'danger' : 'success' });
  };

  const summary = pending ? backupSummary(pending.backup) : null;

  return (
    <Card className="space-y-5">
      <CardTitle icon={<Database className="size-5 text-accent" />}>Your data</CardTitle>
      {sync.enabled ? (
        <section className="space-y-2">
          <p className="text-sm text-muted">Your progress is stored on this device and kept in step with your other devices through your own server. Unfinished writing drafts stay on the device they were started on.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Button variant="secondary" size="sm" disabled={sync.state === 'syncing'} onClick={() => void syncNow()}>
              <RefreshCw className="size-4" /> Sync now
            </Button>
            <span className="text-sm text-muted" role="status">
              {sync.state === 'syncing'
                ? 'Syncing…'
                : sync.state === 'offline'
                  ? 'Offline — your changes will sync when you are back online.'
                  : sync.lastSyncedAt
                    ? `Last synced ${formatDate(sync.lastSyncedAt, lang, { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}`
                    : 'Not synced yet'}
            </span>
          </div>
          {sync.state === 'error' && <Notice tone="danger">Sync failed: {sync.message} Your data on this device is safe.</Notice>}
        </section>
      ) : (
        <p className="text-sm text-muted">Everything you learn is stored only on this device. Export a backup regularly — and use it to move your progress between laptop and phone.</p>
      )}

      <section className="space-y-2">
        <div className="flex flex-wrap gap-2">
          <Button
            variant="secondary"
            onClick={async () => {
              await downloadBackup();
              toast({ message: 'Backup file downloaded.', tone: 'success' });
            }}
          >
            <Download className="size-4" /> Export backup
          </Button>
          <Button variant="secondary" onClick={() => fileRef.current?.click()}>
            <Upload className="size-4" /> Import backup
          </Button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json,.json"
            className="hidden"
            aria-label="Backup file"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) readFile(f);
              e.target.value = '';
            }}
          />
        </div>
        {importError && <Notice tone="danger">{importError}</Notice>}
        {pending && summary && (
          <div className="space-y-3 rounded-xl border border-line bg-surface-2 p-3 text-sm">
            <p>
              <span className="font-semibold">{pending.name}</span> — exported {formatDate(Date.parse(summary.exportedAt), lang, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </p>
            <p className="text-muted">
              {summary.counts.cards} flashcards · {summary.counts.assessments} tests · {summary.counts.days} study days · {summary.counts.writings} texts · {summary.total} records in total
            </p>
            <div className="flex flex-wrap gap-2">
              <Button size="sm" disabled={busy} onClick={() => runImport('merge')}>
                Merge with my data
              </Button>
              {!confirmReplace ? (
                <Button size="sm" variant="secondary" disabled={busy} onClick={() => setConfirmReplace(true)}>
                  Replace my data
                </Button>
              ) : (
                <Button size="sm" variant="danger" disabled={busy} onClick={() => runImport('replace')}>
                  {sync.enabled ? 'Yes, replace everything on all my devices' : 'Yes, replace everything on this device'}
                </Button>
              )}
              <Button size="sm" variant="ghost" disabled={busy} onClick={() => setPending(null)}>
                Cancel
              </Button>
            </div>
            <p className="text-xs text-muted">
              Merge keeps both: when the same item exists on both sides, the newer version wins.{' '}
              {sync.enabled ? 'Replace makes this backup the only copy: your other devices drop their data at their next sync.' : 'Replace deletes this device’s data first.'}
            </p>
          </div>
        )}
      </section>

      <section className="space-y-2 border-t border-line pt-4">
        <p className="text-sm font-medium">Offline use</p>
        <p className="text-sm text-muted">The app works offline after the first visit. To also look up every word and practise every sentence offline, download all data now (about 20 MB).</p>
        <Button variant="secondary" onClick={downloadAll} disabled={!!offline && offline.done < offline.total}>
          <HardDriveDownload className="size-4" /> Download everything for offline
        </Button>
        {offline && (
          <div className="space-y-1">
            <ProgressBar value={offline.done} max={offline.total} label="Offline download progress" />
            <p className="text-xs text-muted">
              {offline.done} / {offline.total} files{offline.failed ? ` · ${offline.failed} failed` : ''}
            </p>
          </div>
        )}
        {storage && (
          <p className="text-xs text-muted">
            Storage used: {mb(storage.usage)} of {mb(storage.quota)} · {storage.persisted ? 'protected from automatic clean-up' : 'the browser may clear it when space runs low — export backups'}
          </p>
        )}
      </section>

      <section className="space-y-2 border-t border-line pt-4">
        <p className="text-sm font-medium">Start over</p>
        {!confirmDelete ? (
          <Button variant="ghost" onClick={() => setConfirmDelete(true)}>
            <Trash2 className="size-4" /> {sync.enabled ? 'Delete all data on all my devices' : 'Delete all data on this device'}
          </Button>
        ) : (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm">This cannot be undone. Export a backup first if you might need it.</span>
            <Button
              variant="danger"
              size="sm"
              onClick={async () => {
                await deleteAllData();
                await replaceEverywhere();
                setConfirmDelete(false);
                router.push('/');
              }}
            >
              Delete everything
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>
              Cancel
            </Button>
          </div>
        )}
      </section>
    </Card>
  );
}
