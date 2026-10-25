import { ExternalLink } from 'lucide-react';
import { ResourcesHeader } from '@/components/shell/resources-header';
import { Card } from '@/components/ui/card';

export const metadata = { title: 'Free resources' };

interface Resource {
  name: string;
  url: string;
  levels: string;
  text: string;
}

const SECTIONS: { title: string; intro?: string; items: Resource[] }[] = [
  {
    title: 'Courses',
    items: [
      { name: 'DW Learn German', url: 'https://learngerman.dw.com/', levels: 'A1–C1', text: 'Deutsche Welle’s free courses, placement test, “Top-Thema” articles and “Langsam gesprochene Nachrichten” (slowly spoken news, with transcripts).' },
      { name: 'Nicos Weg (DW)', url: 'https://learngerman.dw.com/de/nicos-weg/c-36519687', levels: 'A1–B1', text: 'A full video course following Nico’s new life in Germany, with exercises for every episode.' },
      { name: 'VHS-Lernportal', url: 'https://www.vhs-lernportal.de/', levels: 'A1–B1', text: 'Free online German courses from the German adult education centres (Volkshochschulen).' },
    ],
  },
  {
    title: 'News in simple German',
    intro: 'Reading or listening to the news every day is one of the best habits from A2 upwards.',
    items: [
      { name: 'tagesschau in Einfacher Sprache', url: 'https://www.tagesschau.de/', levels: 'A2–B1', text: 'The main German TV news in Einfache Sprache, Monday to Friday — find it on tagesschau.de or tagesschau24.' },
      { name: 'nachrichtenleicht', url: 'https://www.nachrichtenleicht.de/', levels: 'A2–B1', text: 'Weekly news in Einfache Sprache from Deutschlandfunk, with audio and a glossary.' },
      { name: 'Langsam gesprochene Nachrichten (DW)', url: 'https://learngerman.dw.com/', levels: 'B1–B2', text: 'Daily news read slowly, with the full text — search for the series on DW Learn German.' },
    ],
  },
  {
    title: 'Podcasts & audio',
    items: [
      { name: 'Deutschlandfunk', url: 'https://www.deutschlandfunk.de/', levels: 'B2–C2', text: 'Germany’s public information radio: news, background, science and culture — most programmes are available as podcasts.' },
      { name: 'Deutschlandfunk Nova', url: 'https://www.deutschlandfunknova.de/', levels: 'B2–C2', text: 'A younger, more conversational station with podcasts on science, society and everyday life.' },
      { name: 'ARD Audiothek', url: 'https://www.ardaudiothek.de/', levels: 'B1–C2', text: 'Free podcasts, radio plays and audiobooks from all ARD stations.' },
      { name: 'Easy German', url: 'https://www.youtube.com/@EasyGerman', levels: 'A2–C1', text: 'Street interviews with real Germans, subtitled in German and English.' },
    ],
  },
  {
    title: 'Dictionaries & grammar',
    items: [
      { name: 'DWDS', url: 'https://www.dwds.de/', levels: 'B1–C2', text: 'The Digital Dictionary of the German Language: meanings, real usage examples, collocations and word history.' },
      { name: 'Duden', url: 'https://www.duden.de/', levels: 'A2–C2', text: 'Spelling, meanings and grammar of every German word, with the official spelling rules.' },
      { name: 'Wiktionary (Deutsch)', url: 'https://de.wiktionary.org/', levels: 'A1–C2', text: 'Full inflection tables for nouns, verbs and adjectives — the source of this app’s dictionary.' },
      { name: 'Grammis (IDS)', url: 'https://grammis.ids-mannheim.de/', levels: 'B2–C2', text: 'The grammar information system of the Leibniz Institute for the German Language.' },
      { name: 'Tatoeba', url: 'https://tatoeba.org/', levels: 'A1–C2', text: 'Hundreds of thousands of example sentences with translations — the source of this app’s sentences.' },
    ],
  },
  {
    title: 'Free literature',
    intro: 'Classics whose copyright has expired — ideal from B2 for extensive reading.',
    items: [
      { name: 'Projekt Gutenberg-DE', url: 'https://www.projekt-gutenberg.org/', levels: 'B2–C2', text: 'Thousands of German literary works to read online.' },
      { name: 'Project Gutenberg (German)', url: 'https://www.gutenberg.org/browse/languages/de', levels: 'B2–C2', text: 'Free e-books in German (EPUB, Kindle, plain text).' },
      { name: 'Zeno.org', url: 'https://www.zeno.org/', levels: 'C1–C2', text: 'A large library of German literature, philosophy and reference works.' },
    ],
  },
  {
    title: 'Exam preparation',
    intro: 'The exam providers publish free sample papers (Modellsätze / Übungsmaterialien) on their websites.',
    items: [
      { name: 'Goethe-Institut', url: 'https://www.goethe.de/', levels: 'A1–C2', text: 'Goethe-Zertifikat A1–C2: look for “Übungsmaterialien” on the exam pages.' },
      { name: 'telc', url: 'https://www.telc.net/', levels: 'A1–C2', text: 'telc Deutsch exams: sample tests and free downloads for candidates.' },
      { name: 'TestDaF', url: 'https://www.testdaf.de/', levels: 'B2–C1', text: 'The university entrance exam: model tests and preparation material.' },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-6">
      <ResourcesHeader />
      {SECTIONS.map((section) => (
        <section key={section.title} className="space-y-3">
          <div>
            <h2 className="text-lg font-semibold">{section.title}</h2>
            {section.intro && <p className="text-sm text-muted">{section.intro}</p>}
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {section.items.map((r) => (
              <Card key={r.name} className="flex flex-col gap-1.5">
                <a href={r.url} target="_blank" rel="noreferrer" className="flex items-start justify-between gap-2 font-semibold hover:text-accent">
                  <span>{r.name}</span>
                  <ExternalLink className="mt-1 size-4 shrink-0 text-muted" aria-hidden />
                </a>
                <span className="w-fit rounded-full bg-surface-2 px-2 py-0.5 text-xs font-medium text-muted">{r.levels}</span>
                <p className="text-sm text-muted">{r.text}</p>
              </Card>
            ))}
          </div>
        </section>
      ))}
      <p className="text-xs text-muted">External sites have their own terms and privacy policies. Links open in a new tab.</p>
    </div>
  );
}
