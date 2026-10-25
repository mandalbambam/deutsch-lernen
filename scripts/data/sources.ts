/**
 * Open-licensed data sources used to build /public/data.
 * Downloaded into .data-cache/ (gitignored) by `npm run data:download`.
 */
export interface Source {
  id: string;
  url: string;
  file: string;
  license: string;
  attribution: string;
}

export const SOURCES: Source[] = [
  {
    id: 'tatoeba-deu',
    url: 'https://downloads.tatoeba.org/exports/per_language/deu/deu_sentences_detailed.tsv.bz2',
    file: 'deu_sentences_detailed.tsv.bz2',
    license: 'CC BY 2.0 FR',
    attribution: 'Tatoeba (https://tatoeba.org)',
  },
  {
    id: 'tatoeba-deu-eng-links',
    url: 'https://downloads.tatoeba.org/exports/per_language/deu/deu-eng_links.tsv.bz2',
    file: 'deu-eng_links.tsv.bz2',
    license: 'CC BY 2.0 FR',
    attribution: 'Tatoeba (https://tatoeba.org)',
  },
  {
    id: 'tatoeba-eng',
    url: 'https://downloads.tatoeba.org/exports/per_language/eng/eng_sentences.tsv.bz2',
    file: 'eng_sentences.tsv.bz2',
    license: 'CC BY 2.0 FR',
    attribution: 'Tatoeba (https://tatoeba.org)',
  },
  {
    id: 'tatoeba-deu-tags',
    url: 'https://downloads.tatoeba.org/exports/per_language/deu/deu_tags.tsv.bz2',
    file: 'deu_tags.tsv.bz2',
    license: 'CC BY 2.0 FR',
    attribution: 'Tatoeba (https://tatoeba.org)',
  },
  {
    id: 'tatoeba-user-languages',
    url: 'https://downloads.tatoeba.org/exports/user_languages.tar.bz2',
    file: 'user_languages.tar.bz2',
    license: 'CC BY 2.0 FR',
    attribution: 'Tatoeba (https://tatoeba.org)',
  },
  {
    id: 'kaikki-german',
    url: 'https://kaikki.org/dictionary/German/kaikki.org-dictionary-German.jsonl.gz',
    file: 'kaikki-german.jsonl.gz',
    license: 'CC BY-SA 4.0',
    attribution: 'Wiktionary (https://en.wiktionary.org) via kaikki.org / wiktextract',
  },
  {
    id: 'frequency-de',
    url: 'https://raw.githubusercontent.com/hermitdave/FrequencyWords/master/content/2018/de/de_full.txt',
    file: 'de_full.txt',
    license: 'CC BY-SA 4.0',
    attribution: 'FrequencyWords by Hermit Dave (OpenSubtitles 2018 corpus)',
  },
];

export const CACHE_DIR = '.data-cache';
