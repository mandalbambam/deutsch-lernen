# Deutsch Lernen

A personal German trainer that takes you from your current level to C2 — completely free to run.

- **Adaptive placement test (A1–C2)** for grammar, vocabulary, reading and listening, with error-pattern analysis, level history and short **level checks** every few weeks
- **Personal daily plan** built from your results and goals (work, exams, daily life, literature), re-adjusted every week, weakest skills first
- **Flashcards with spaced repetition (FSRS)**: gender colours, plurals, example sentences, audio, keyboard shortcuts and swipe gestures
- **Grammar A1–C2**: 73 lessons with 1,160+ rule-checked exercises that explain *why* an answer is wrong, plus unlimited generated drills for every B1–C2 topic and optional AI-written exercises for B2–C2
- **Reading**: 36 graded texts with tap-to-look-up (dictionary built from Wiktionary) and one-tap “add to flashcards”
- **Listening**: 24 dialogues and talks read aloud by your device, transcripts, and dictation with real sentences
- **Writing coach** (24 exam-style tasks) and **conversation partner** (18 role-plays) — with optional AI feedback, or self-check and model answers without it
- **Progress dashboard**: levels per skill, streak, words learned, review forecast, study time and your most frequent mistakes
- **Installable PWA** that works offline; all your data stays on your device (IndexedDB), with JSON backup/restore

Everything runs without paid services. The AI features are optional — the app works fully without them.

## Quick start

```bash
git clone https://github.com/mandalbambam/deutsch-lernen.git
cd deutsch-lernen
npm install
npm run dev
```

Then open <http://localhost:3000> and take the placement test. That's it — no account, no API key, no database to set up.

**Contents:** [Run it locally](#1-run-it-locally) · [Optional AI features](#2-optional-free-ai-features-with-a-gemini-key) · [Deploy for free](#3-deploy-for-free-on-vercel) · [Install on your phone](#4-install-the-app-on-your-phone) · [Troubleshooting](#troubleshooting) · [Data and licences](#5-data-and-licences) · [How it is built](#6-how-it-is-built)

---

## 1. Run it locally

Requirements:

- [Node.js](https://nodejs.org) 20.9 or newer (the LTS version is fine) — check with `node --version`
- [Git](https://git-scm.com/downloads) to clone the repository (or use **Code → Download ZIP** on GitHub and unzip it)

```bash
git clone https://github.com/mandalbambam/deutsch-lernen.git
cd deutsch-lernen
npm install
npm run dev
```

Open <http://localhost:3000>. The dictionary, sentence and vocabulary data are already in `public/data`, so nothing else needs downloading.

**First steps in the app**

1. **Onboarding** — pick your goals (work, exams, daily life, literature) and how many minutes a day you want to study.
2. **Placement test** — it adapts to your answers and estimates your level per skill (A1–C2).
3. **Today** — start the daily session the app builds for you. Use the menu for flashcards, grammar, reading, listening, writing and conversation whenever you like.
4. **Settings → Your data → Export backup** now and then — your progress lives only in your browser.

To update to the newest version later: `git pull`, then `npm install` and restart `npm run dev`.

To try the production build (needed to test offline mode, because the service worker only runs in production):

```bash
npm run build
npm start
```

### Useful scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server with hot reload |
| `npm run build` / `npm start` | Production build / serve it on port 3000 |
| `npm test` | Unit tests (vitest) |
| `npm run check` | Type check, lint, content validation and unit tests |
| `npm run validate:content` | Check all hand-written content (test bank, grammar answers, texts, tasks, role-plays) |
| `npm run e2e` | Browser smoke test against a running server (uses your installed Chrome or Edge; `BASE_URL=http://localhost:3000` by default) |
| `npm run data` | Re-download the open data and rebuild `public/data` (~160 MB download, ~1 minute build) |

## 2. Optional: free AI features with a Gemini key

The writing coach, the conversation partner, the writing part of the placement test, the “Explain my answer” button and the “AI exercises” button on B2–C2 grammar topics can use Google’s Gemini API. The free tier is enough for personal use.

1. Go to **[Google AI Studio](https://aistudio.google.com/apikey)** and sign in with a Google account.
2. Click **Create API key** (accept the terms; let it create a new project).
3. **Do not enable billing** on that project — then you can never be charged. When the daily free quota is used up, the app shows “Daily free limit reached” (it resets at midnight Pacific Time, 9:00 in Germany).
4. Create a file `.env.local` in the project folder:

   ```bash
   GEMINI_API_KEY=your-key-here
   # optional:
   # GEMINI_MODEL=gemini-3.8-flash          # used for writing feedback and grading
   # GEMINI_LITE_MODEL=gemini-3.5-flash-lite # used for chat turns and short explanations
   # APP_PASSPHRASE=choose-a-secret          # protects your quota when deployed publicly
   ```

5. Restart `npm run dev`.

How it works and what to know:

- The key stays on the server (the Next.js route `app/api/ai`); it is never sent to the browser. The browser only names a task and sends its text — prompts are built on the server, answers are checked against a schema, and identical requests are answered from a cache on your device.
- **Privacy:** on the free tier, Google may use what you send (and the answers) to improve its products, and human reviewers may read it. The app asks you to confirm this once before the first AI request. Don’t submit personal information.
- If you set `APP_PASSPHRASE`, enter the same passphrase in the app under **Settings → AI features**.
- If a model is overloaded (“high demand”), retired or out of daily quota, the app automatically tries the next one: your model → `gemini-3.5-flash` → Google’s `gemini-flash-latest` alias → the lite model. If Google renames its models, you can also set `GEMINI_MODEL`/`GEMINI_LITE_MODEL` to a current Flash model listed in AI Studio.
- Your current limits are shown on the [AI Studio rate-limit page](https://aistudio.google.com/rate-limit).
- To try the AI screens without a key, start the server with `GEMINI_MOCK=1` — it returns canned answers (also used by the end-to-end test).

## 3. Deploy for free on Vercel

1. Create a free GitHub account and open <https://github.com/mandalbambam/deutsch-lernen>.
2. Click **Fork** to get your own copy of the repository (so your deployment and your changes are yours).
3. Sign up at **[vercel.com](https://vercel.com)** with GitHub (the free **Hobby** plan is for personal, non-commercial use — exactly this).
4. **Add New → Project →** import your repository. Vercel detects Next.js; keep the defaults.
5. Optional: under **Settings → Environment Variables** add `GEMINI_API_KEY` (and `APP_PASSPHRASE` if you want to protect your quota), then **Deployments → ⋯ → Redeploy**.
6. You get a URL like `https://your-app.vercel.app`. Every `git push` deploys a new version automatically; the app shows “A new version is ready” and reloads when you tap it.

## 4. Install the app on your phone

Open your Vercel URL on the phone, then:

- **Android (Chrome):** menu ⋮ → **Install app** (or **Add to Home screen**).
- **iPhone/iPad (Safari):** Share button → **Add to Home Screen**.

The installed app starts full-screen and works offline after the first visit. To look up any word and practise any sentence offline too, open **Settings → Your data → Download everything for offline** (about 20 MB).

> **iPhone tip:** Safari may delete a website’s stored data after 7 days without a visit. Data of apps added to the Home Screen is kept, so install the app — and export a backup now and then.

### German voices (listening and read-aloud)

Listening uses your device’s built-in text-to-speech. If the app says *No German voice found*:

- **Windows:** Settings → Time & language → Speech → *Add voices* → Deutsch (Deutschland).
- **macOS / iPhone:** System Settings → Accessibility → Spoken Content → System voice → Manage voices → German.
- **Android:** install or update *Speech Services by Google*, then add German under its settings.

Without a voice, listening tasks fall back to reading the transcript. Speech recognition (for speaking practice and the microphone in conversations) works in Chrome and Edge.

### Moving progress between laptop and phone

Your progress lives only in the browser where you use the app. Use **Settings → Your data → Export backup** to save a JSON file and **Import backup** on the other device. Choose *Merge* to combine both devices’ history (the newer version of each item wins) or *Replace* to restore a backup exactly.

## Troubleshooting

| Problem | Fix |
| --- | --- |
| `npm install` fails or the app won't start | Check `node --version` is 20.9 or newer; delete `node_modules` and run `npm install` again |
| Port 3000 is already in use | `npm run dev -- -p 3001` and open <http://localhost:3001> |
| AI buttons say the feature is not configured | Add `GEMINI_API_KEY` to `.env.local` (see [section 2](#2-optional-free-ai-features-with-a-gemini-key)) and restart the server |
| “Daily free limit reached” | The free Gemini quota is used up; it resets at midnight Pacific Time. Everything else keeps working |
| “No German voice found” | Install a German text-to-speech voice (see [German voices](#german-voices-listening-and-read-aloud)) |
| Offline mode doesn't work | The service worker only runs in production: use `npm run build && npm start` (or the deployed app) |
| Progress is gone after switching browser/device | Data is stored per browser — use **Export backup** / **Import backup** |

## 5. Data and licences

| Source | Used for | Licence |
| --- | --- | --- |
| [Tatoeba](https://tatoeba.org) | example sentences, cloze, dictation | CC BY 2.0 FR |
| [Wiktionary](https://en.wiktionary.org) via [kaikki.org](https://kaikki.org) | genders, plurals, conjugations, glosses | CC BY-SA 4.0 |
| [FrequencyWords](https://github.com/hermitdave/FrequencyWords) (OpenSubtitles 2018) | word frequencies | CC BY-SA 4.0 |

The app's source code and hand-written content are released under the [MIT License](LICENSE).
The derived files in `public/data/lex` and `public/data/verbs` are shared under CC BY-SA 4.0 (as required by their sources).
The placement test, grammar lessons, reading texts, listening scripts, writing tasks and role-plays were written for this app and aligned with the CEFR descriptors. CEFR levels of individual words and sentences are estimated automatically. Nothing here is an official certificate.
The **Free resources** page only links to external sites (DW, tagesschau, Deutschlandfunk …); no content is copied.

## 6. How it is built

- Next.js 16 (App Router, static pages) · React 19 · TypeScript · Tailwind CSS 4
- Dexie (IndexedDB) for all personal data · ts-fsrs for spaced repetition · zod for data contracts
- Hand-written service worker (`public/sw.js`) for offline support
- Web Speech API for German text-to-speech and (where supported) speech recognition
- Optional Gemini API through one server route with structured JSON output, model fallback and rate-limit handling

```
app/            pages (static shells; content selected via ?id=…) and the AI API routes
components/     UI, charts, exercises, reader, listening player, writing coach, chat …
content/        hand-written content: placement bank, grammar, texts, scripts, tasks, role-plays, error taxonomy
lib/            database, placement engine, plan builder, SRS, drills, lexicon lookup, speech, AI client/server, backup
scripts/data/   download + build pipeline for public/data
public/data/    generated, content-hashed JSON (dictionary shards, sentences, decks)
tests/          unit tests (vitest) and the browser smoke test (tests/e2e)
```
