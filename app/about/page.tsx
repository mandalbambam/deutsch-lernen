import { Card, CardTitle, PageHeader } from '@/components/ui/card';

export const metadata = { title: 'About & licenses' };

const SOURCES = [
  {
    name: 'Tatoeba',
    url: 'https://tatoeba.org',
    license: 'CC BY 2.0 FR',
    licenseUrl: 'https://creativecommons.org/licenses/by/2.0/fr/',
    use: 'German–English example sentences, cloze exercises and dictation. Each sentence links back to its page on tatoeba.org (contributors are credited there).',
  },
  {
    name: 'Wiktionary via kaikki.org (wiktextract)',
    url: 'https://kaikki.org/dictionary/German/',
    license: 'CC BY-SA 4.0 (and GFDL)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    use: 'Dictionary: genders, plurals, conjugations and English glosses. The derived lexicon files in /data/lex and /data/verbs are shared under the same licence.',
  },
  {
    name: 'FrequencyWords by Hermit Dave (OpenSubtitles 2018)',
    url: 'https://github.com/hermitdave/FrequencyWords',
    license: 'CC BY-SA 4.0 (content)',
    licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/',
    use: 'Word frequencies used to order vocabulary by usefulness and estimate CEFR bands.',
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHeader title="About & licenses" subtitle="A free, private German trainer from A1 to C2." />
      <div className="space-y-4">
        <Card className="space-y-2">
          <CardTitle>Your data stays on your device</CardTitle>
          <p className="text-sm">
            Everything you do — test results, flashcards, texts you write, conversations, progress — is stored locally in your browser (IndexedDB). There
            is no account and no server database. Use <em>Settings → Your data → Export backup</em> to back up your progress or move it to another device.
          </p>
          <p className="text-sm text-muted">
            The optional AI features send only the text you submit to Google’s Gemini API through this app’s server route; the API key never reaches your
            browser. On the free tier, Google may use that text and the answers to improve its products, and human reviewers may read them — don’t submit
            personal information.
          </p>
        </Card>

        <Card className="space-y-3">
          <CardTitle>Open data used in this app</CardTitle>
          <ul className="space-y-4">
            {SOURCES.map((s) => (
              <li key={s.name} className="space-y-1 text-sm">
                <a href={s.url} target="_blank" rel="noreferrer" className="font-semibold text-accent hover:underline">
                  {s.name}
                </a>
                <p>{s.use}</p>
                <p className="text-muted">
                  Licence:{' '}
                  <a href={s.licenseUrl} target="_blank" rel="noreferrer" className="hover:underline">
                    {s.license}
                  </a>
                </p>
              </li>
            ))}
          </ul>
        </Card>

        <Card className="space-y-2 text-sm">
          <CardTitle>About the levels</CardTitle>
          <p>
            CEFR levels for words and example sentences are estimated automatically from word frequency and grammar features. The placement test,
            grammar lessons and texts were written for this app and aligned with the CEFR descriptors, but they are not an official certificate.
          </p>
        </Card>

        <Card className="space-y-2 text-sm">
          <CardTitle>Content written for this app</CardTitle>
          <p>
            The placement test bank, 73 grammar lessons, 36 reading texts, 24 listening scripts, 24 writing tasks with model answers and 18 role-plays
            are original content. People, firms and places in the stories are fictional unless they are clearly historical or public (for example the fall
            of the Berlin Wall or the Stolpersteine project).
          </p>
          <p className="text-muted">The Free resources page only links to other sites; nothing from them is copied into the app.</p>
        </Card>
      </div>
    </>
  );
}
