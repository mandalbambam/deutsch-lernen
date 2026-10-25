/**
 * End-to-end smoke test against a running production server, using the locally installed
 * Chrome or Edge (no browser download needed).
 *
 *   npm run build && npm start        # in one terminal (port 3000)
 *   npm run e2e                       # in another
 *
 * Env: BASE_URL (default http://localhost:3000), SHOTS=<dir> to save screenshots.
 */
import { chromium } from 'playwright-core';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';

const BASE = process.env.BASE_URL ?? 'http://localhost:3000';
const SHOTS = process.env.SHOTS;
if (SHOTS) mkdirSync(SHOTS, { recursive: true });

const results = [];
function check(name, ok, detail = '') {
  results.push({ name, ok, detail });
  console.log(`${ok ? '✓' : '✗'} ${name}${detail ? ` — ${detail}` : ''}`);
}

async function launch() {
  for (const channel of ['chrome', 'msedge']) {
    try {
      return await chromium.launch({ channel, headless: true });
    } catch {
      /* try next */
    }
  }
  throw new Error('Neither Chrome nor Edge could be launched');
}

async function shot(page, name) {
  if (SHOTS) await page.screenshot({ path: join(SHOTS, `${name}.png`), fullPage: true });
}

const visible = (locator) => locator.isVisible().catch(() => false);

/** Answers whatever exercise is on screen (first option or a guess), waits for feedback and moves on. */
async function answerExercise(page) {
  const options = page.getByRole('group', { name: 'Answer options' });
  const bank = page.getByRole('group', { name: 'Word bank' });
  if (await visible(options)) {
    await options.getByRole('button').first().click();
  } else if (await visible(page.getByLabel('Your answer'))) {
    await page.getByLabel('Your answer').fill('x');
    await page.getByRole('button', { name: 'Check' }).click();
  } else if (await visible(page.locator('textarea'))) {
    await page.locator('textarea').fill('Das ist ein Test.');
    await page.getByRole('button', { name: 'Check' }).click();
  } else if (await visible(bank)) {
    for (let i = 0; i < 20 && (await bank.getByRole('button').count()) > 0; i++) await bank.getByRole('button').first().click();
    await page.getByRole('button', { name: 'Check' }).click();
  } else {
    return false;
  }
  await page.getByText(/^(Correct|Almost|Not quite)$/).first().waitFor({ timeout: 5000 });
  await page.getByRole('button', { name: /^(Next|Finish)$/ }).click();
  return true;
}

/** Answers exercises until the summary ("… correct") appears; returns how many were answered. */
async function answerAll(page, max = 15) {
  let n = 0;
  for (; n < max; n++) {
    if (await visible(page.getByText(/% correct/).first())) break;
    if (!(await answerExercise(page))) break;
    await page.waitForTimeout(80);
  }
  return n;
}

const browser = await launch();
const context = await browser.newContext({ viewport: { width: 1280, height: 860 } });
const page = await context.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push(String(e)));
let offline = false;
page.on('console', (m) => {
  // failed requests while deliberately offline are expected
  // requests that fail while offline may be reported a moment later — they are network conditions, not app errors
  if (m.type() === 'error' && !/ERR_INTERNET_DISCONNECTED/.test(m.text()) && !(offline && /Failed to fetch|RSC payload/.test(m.text()))) errors.push(m.text());
});

try {
  // ── home ──────────────────────────────────────────────
  await page.goto(`${BASE}/`);
  await page.getByText('Find your level first').waitFor({ timeout: 15000 });
  check('home shows placement call-to-action', true);
  await shot(page, '01-home');

  // ── placement test ────────────────────────────────────
  await page.goto(`${BASE}/placement`);
  await page.getByRole('button', { name: /Begin the test/ }).waitFor();
  await shot(page, '02-placement-intro');
  const skip = page.getByLabel('Skip the listening section');
  if (await skip.isEnabled()) await skip.check();
  const begin = page.getByRole('button', { name: /Begin the test/ });
  await begin.click();
  const firstQuestion = page.getByText(/Question 1 of/);
  if (!(await firstQuestion.waitFor({ timeout: 8000 }).then(() => true, () => false))) {
    // the click can race hydration on a cold server: try once more
    if (await begin.isVisible()) await begin.click();
    await firstQuestion.waitFor({ timeout: 15000 });
  }

  let answered = 0;
  for (let i = 0; i < 60; i++) {
    if (page.url().includes('/placement/results')) break;
    const options = page.getByRole('radio');
    try {
      await options.first().waitFor({ timeout: 8000 });
    } catch {
      if (page.url().includes('/placement/results')) break;
      throw new Error('no options visible');
    }
    if (i === 1) await shot(page, '03-placement-question');
    // alternate between first option and "I don't know" for variety
    if (i % 5 === 4) await page.getByRole('button', { name: /I don.t know/ }).click();
    else await options.nth(i % (await options.count())).click();
    await page.getByRole('button', { name: /^Next$/ }).click();
    answered++;
    await page.waitForTimeout(60);
  }
  await page.waitForURL(/\/placement\/results/, { timeout: 15000 });
  await page.getByText('Overall level').waitFor({ timeout: 15000 });
  check('placement test completes and shows results', true, `${answered} questions answered`);
  check('test length within 24–42 questions', answered >= 24 && answered <= 42, String(answered));
  await shot(page, '04-results');

  // ── persistence ───────────────────────────────────────
  await page.goto(`${BASE}/`);
  await page.getByText('Your level').waitFor({ timeout: 15000 });
  check('home shows stored level after reload (IndexedDB)', true);

  // ── onboarding → plan ─────────────────────────────────
  await page.getByRole('link', { name: 'Set up plan' }).click();
  await page.getByRole('radio', { name: /15 min/ }).click();
  await page.getByRole('button', { name: /Daily life/ }).click();
  await page.getByRole('button', { name: 'Travel', exact: true }).click();
  await shot(page, '07-onboarding');
  await page.getByRole('button', { name: /Save and build my plan/ }).click();
  await page.waitForURL(`${BASE}/`);
  const startBtn = page.getByRole('link', { name: /Start today’s session|Start today's session/ });
  await startBtn.waitFor({ timeout: 15000 });
  await page.getByText(/Flashcards/).first().waitFor({ timeout: 15000 });
  check('onboarding creates a plan and today’s session', true);
  await shot(page, '08-home-session');

  // ── daily session: skip through every block ──────────
  await startBtn.click();
  await page.waitForURL(/\/session/);
  await page.getByRole('button', { name: 'Skip' }).first().waitFor({ timeout: 15000 });
  await shot(page, '09-session-block');
  for (let i = 0; i < 4; i++) {
    await page.getByRole('button', { name: 'Skip', exact: true }).first().click();
    await page.waitForTimeout(400);
  }
  const sessionDone = await page
    .getByText('Session complete — great work!')
    .waitFor({ timeout: 10000 })
    .then(() => true, () => false);
  check('daily session can be completed', sessionDone);

  // ── flashcards: review a few cards ────────────────────
  await page.goto(`${BASE}/cards`);
  const reviewBtn = page.getByRole('button', { name: /^Review \d+ cards/ });
  await reviewBtn.waitFor({ timeout: 15000 });
  await reviewBtn.click();
  let rated = 0;
  for (let i = 0; i < 12 && rated < 4; i++) {
    const article = page.getByRole('group', { name: 'Choose the article' });
    if (await article.isVisible().catch(() => false)) {
      await article.getByRole('button').first().click();
    }
    const show = page.getByRole('button', { name: 'Show answer' });
    if (await show.isVisible().catch(() => false)) await show.click();
    const good = page.getByRole('button', { name: /^Good/ });
    if (await good.isVisible().catch(() => false)) {
      if (rated === 0) await shot(page, '10-card-back');
      await good.click();
      rated++;
    }
    await page.waitForTimeout(250);
  }
  check('flashcards: cards can be revealed and rated', rated >= 4, `${rated} rated`);
  await page.getByRole('button', { name: /Undo/ }).click();
  check('flashcards: undo works', await page.getByText(/left/).first().isVisible());

  // ── browse + add a word ───────────────────────────────
  await page.goto(`${BASE}/cards/browse`);
  await page.getByRole('radio', { name: 'Add words' }).click();
  await page.getByRole('radio', { name: 'B2' }).click();
  const addBtn = page.getByRole('button', { name: /^Add$/ }).first();
  await addBtn.waitFor({ timeout: 15000 });
  await addBtn.click();
  const added = await page
    .getByRole('button', { name: 'Added' })
    .first()
    .waitFor({ timeout: 5000 })
    .then(() => true, () => false);
  check('browse: add a word from the frequency deck', added);

  // ── grammar ───────────────────────────────────────────
  await page.goto(`${BASE}/grammar`);
  await page.getByRole('radio', { name: 'C1' }).click();
  await page.getByText('Konjunktiv I').first().waitFor({ timeout: 15000 });
  check('grammar: topic list by level', true);
  await page.goto(`${BASE}/grammar/topic?id=a1-artikel-genus`);
  await page.getByRole('heading', { level: 1 }).waitFor({ timeout: 15000 });
  check('grammar: explanation renders a table', await visible(page.locator('table').first()));
  await shot(page, '11-grammar-topic');
  await page.getByRole('button', { name: /^Practise \(\d+\)/ }).click();
  await page.getByRole('group', { name: 'Answer options' }).or(page.getByLabel('Your answer')).first().waitFor({ timeout: 10000 });
  await answerExercise(page);
  await shot(page, '12-grammar-exercise');
  const grammarAnswered = 1 + (await answerAll(page));
  check('grammar: all lesson exercises can be answered', await visible(page.getByText(/% correct/).first()), `${grammarAnswered} answered`);
  await page.getByRole('button', { name: 'Back to the topic' }).click();
  check('grammar: mastery is shown after practice', await page.getByText(/mastery|Mastered/).first().waitFor({ timeout: 5000 }).then(() => true, () => false));
  await page.getByRole('button', { name: /Unlimited drill/ }).click();
  await page.getByText(/· drill/).waitFor({ timeout: 15000 });
  const drilled = await answerAll(page, 3);
  check('grammar: generated drill works', drilled === 3, `${drilled} answered`);

  // ── reading with tap-to-look-up ───────────────────────
  await page.goto(`${BASE}/reading`);
  await page.getByText('Graded texts for every level', { exact: false }).waitFor({ timeout: 15000 });
  await page.goto(`${BASE}/reading/text?id=a1-ich-bin-lena`);
  await page.getByRole('button', { name: 'Krankenschwester', exact: true }).click();
  const sheet = page.getByRole('dialog');
  const lookedUp = await sheet.getByText(/nurse/i).first().waitFor({ timeout: 10000 }).then(() => true, () => false);
  check('reading: tapping a word shows its dictionary entry', lookedUp);
  await shot(page, '13-reading-lookup');
  await sheet.getByRole('button', { name: 'Add to flashcards' }).click();
  check('reading: add the word to flashcards', await sheet.getByText('In your flashcards').waitFor({ timeout: 5000 }).then(() => true, () => false));
  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: /Answer \d+ questions/ }).click();
  await answerAll(page);
  await page.getByRole('button', { name: 'Finish' }).click();
  check('reading: comprehension questions and completion', await page.getByText(/Text finished/).waitFor({ timeout: 10000 }).then(() => true, () => false));

  // ── listening ─────────────────────────────────────────
  await page.goto(`${BASE}/listening?id=a1-l-baeckerei`);
  await page.getByText('First read the questions, then listen.').waitFor({ timeout: 15000 });
  await shot(page, '14-listening');
  await page.getByRole('button', { name: 'Answer the questions' }).click();
  await answerAll(page);
  await page.getByRole('button', { name: 'Show transcript' }).click();
  await page.getByText('Transcript', { exact: true }).waitFor({ timeout: 5000 });
  await page.getByRole('button', { name: 'Finish' }).click();
  check('listening: questions, transcript and completion', await page.getByText(/^Done ·/).waitFor({ timeout: 10000 }).then(() => true, () => false));

  // ── learn hub + resources ─────────────────────────────
  await page.goto(`${BASE}/learn`);
  check('learn hub shows progress', await page.getByText(/1 of \d+ texts read/).waitFor({ timeout: 10000 }).then(() => true, () => false));
  await page.goto(`${BASE}/resources`);
  const external = await page.locator('a[target="_blank"][href^="https://"]').count();
  check('resources page links out (new tab)', external >= 15, `${external} links`);

  // ── AI features (real flows when the server runs with GEMINI_MOCK=1) ─────
  const waitText = (locator, timeout = 15000) => locator.waitFor({ timeout }).then(() => true, () => false);
  const aiStatus = await page.evaluate(() => fetch('/api/ai/status').then((r) => r.json()));
  if (aiStatus.configured) {
    await page.goto(`${BASE}/writing?id=a1-w-vorstellung`);
    await page.getByLabel('Your text').fill('Hallo Jonas, ich heiße Sara und bin 25 Jahre alt. Ich komme aus Italien und wohne jetzt in München. Ich studiere Informatik und spiele gern Tennis.');
    await page.getByRole('button', { name: 'Get AI feedback' }).click();
    await page.getByRole('button', { name: /I understand/ }).click();
    await page.getByRole('button', { name: 'Get AI feedback' }).click();
    check('writing: AI feedback after accepting the data notice', await waitText(page.getByText('Your text shows level')));
    await shot(page, '16-writing-feedback');

    await page.goto(`${BASE}/conversation?id=a1-c-cafe`);
    await page.getByLabel('Your message').fill('Ich hätte gern einen Kaffee');
    await page.getByRole('button', { name: 'Send' }).click();
    const corrected = await waitText(page.getByText('Better:'));
    check('conversation: partner replies and corrects the message', corrected && (await visible(page.getByText(/Erzählen Sie mir/).first())));
    await shot(page, '17-conversation');

    await page.goto(`${BASE}/grammar/topic?id=c1-konjunktiv1`);
    await page.getByRole('button', { name: /^Practise \(\d+\)/ }).click();
    await page.locator('textarea').fill('Der Sprecher sagt, das Projekt ist ein Erfolg.');
    await page.getByRole('button', { name: 'Check' }).click();
    await page.getByRole('button', { name: 'Explain my answer' }).click();
    check('exercise: AI explains the learner’s own answer', await waitText(page.getByText(/Mock explanation/)));

    await page.goto(`${BASE}/placement/results`);
    await page.getByRole('button', { name: 'Write a sample' }).click();
    const sample =
      'Ich finde das Thema sehr wichtig. Viele Menschen arbeiten heute von zu Hause aus, und das hat Vorteile und Nachteile. Einerseits spart man Zeit, weil man nicht pendeln muss. Andererseits fehlt oft der Kontakt zu den Kollegen. Außerdem ist es schwer, Arbeit und Freizeit zu trennen. Meiner Meinung nach ist eine Mischung die beste Lösung: zwei Tage zu Hause, drei Tage im Büro. So kann man konzentriert arbeiten und trotzdem im Team bleiben. Die Firmen sollten klare Regeln machen, damit niemand abends noch E-Mails beantworten muss. Ich bin gespannt, wie sich das in Zukunft entwickelt, denn die Technik wird immer besser und viele junge Menschen wünschen sich mehr Flexibilität.';
    await page.getByLabel('Writing sample').fill(sample);
    await page.getByRole('button', { name: 'Assess my writing' }).click();
    check('placement: optional AI-graded writing sample', await waitText(page.getByText('Assessed writing level')));
  } else {
    await page.goto(`${BASE}/writing?id=a1-w-vorstellung`);
    check('writing: “AI not configured” shown without a key', await waitText(page.getByText('AI not configured').first()));
  }

  await page.goto(`${BASE}/writing?id=a2-w-absage`);
  await page
    .getByLabel('Your text')
    .fill('Sehr geehrte Damen und Herren, ich kann morgen leider nicht zu meinem Termin kommen, weil ich krank bin. Können Sie mir bitte einen neuen Termin geben? Ich habe am Montag Zeit. Mit freundlichen Grüßen');
  await page.getByRole('button', { name: 'Check it myself' }).click();
  await page.getByRole('checkbox').first().check();
  await page.getByRole('button', { name: /Show the model answer/ }).click();
  await page.getByRole('button', { name: 'Save to my writing history' }).click();
  check('writing: self-check with checklist and model answer', await waitText(page.getByText('Saved', { exact: true })));

  // ── progress dashboard ────────────────────────────────
  await page.goto(`${BASE}/progress`);
  const dashboard = (await waitText(page.getByText('Levels per skill', { exact: true }))) && (await waitText(page.getByText('Recurring mistakes', { exact: true })));
  check('progress dashboard shows levels and recurring mistakes', dashboard);
  await shot(page, '18-progress');

  // ── level check ───────────────────────────────────────
  await page.goto(`${BASE}/placement?mode=check`);
  await page.getByRole('heading', { name: 'Level check' }).waitFor({ timeout: 15000 });
  const skipL = page.getByLabel('Skip the listening section');
  if (await skipL.isEnabled().catch(() => false)) await skipL.check();
  await page.getByRole('button', { name: /Begin/ }).click();
  let lc = 0;
  for (; lc < 40; lc++) {
    if (page.url().includes('/placement/results')) break;
    const opts = page.getByRole('radio');
    if (!(await opts.first().waitFor({ timeout: 8000 }).then(() => true, () => false))) break;
    await opts.first().click();
    await page.getByRole('button', { name: /^Next$/ }).click();
    await page.waitForTimeout(60);
  }
  await page.waitForURL(/\/placement\/results/, { timeout: 15000 }).catch(() => {});
  const lcDone = await waitText(page.getByText(/Level check ·/).first());
  check('level check: short adaptive quiz completes', lcDone && lc <= 30, `${lc} questions`);

  // ── backup: export, then import (merge) ───────────────
  await page.goto(`${BASE}/settings`);
  const [download] = await Promise.all([page.waitForEvent('download'), page.getByRole('button', { name: 'Export backup' }).click()]);
  const backupPath = await download.path();
  check('backup: export downloads a JSON file', !!backupPath && download.suggestedFilename().startsWith('deutsch-lernen-backup-'), download.suggestedFilename());
  await page.getByLabel('Backup file').setInputFiles(backupPath);
  await page.getByRole('button', { name: 'Merge with my data' }).click();
  check('backup: import (merge) restores the file', await waitText(page.getByText(/Backup merged/)));

  // ── offline download of all data ──────────────────────
  await page.getByRole('button', { name: 'Download everything for offline' }).click();
  check('offline: download everything for offline use', await waitText(page.getByText('Everything is stored for offline use.'), 60000));

  // ── settings + dark mode ──────────────────────────────
  await page.goto(`${BASE}/settings`);
  await page.getByRole('radio', { name: 'Dark' }).click();
  const isDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  check('dark mode toggles', isDark);
  await page.reload();
  const stillDark = await page.evaluate(() => document.documentElement.classList.contains('dark'));
  check('dark mode persists across reload', stillDark);
  await shot(page, '05-settings-dark');
  await page.getByRole('radio', { name: 'Light' }).click();

  // ── service worker / offline ──────────────────────────
  const swReady = await page.evaluate(async () => {
    if (!('serviceWorker' in navigator)) return false;
    const reg = await Promise.race([navigator.serviceWorker.ready, new Promise((r) => setTimeout(() => r(null), 15000))]);
    return !!reg;
  });
  check('service worker registered', swReady);
  if (swReady) {
    // let the install step finish precaching
    await page.waitForTimeout(3000);
    await page.reload();
    await context.setOffline(true);
    offline = true;
    await page.goto(`${BASE}/about`);
    const aboutOk = await page.getByText('Open data used in this app').isVisible().catch(() => false);
    check('works offline: /about from cache', aboutOk);
    await page.goto(`${BASE}/placement/results`);
    const resultsOk = await page
      .getByText('Overall level')
      .first()
      .waitFor({ timeout: 10000 })
      .then(() => true)
      .catch(() => false);
    check('works offline: results from IndexedDB', resultsOk);
    if (!resultsOk) await shot(page, 'zz-offline-results');
    // client-side navigation while offline falls back to a cached full page load
    await page.getByRole('link', { name: 'Settings' }).first().click();
    const navOk = await page
      .getByText('Interface language')
      .waitFor({ timeout: 10000 })
      .then(() => true)
      .catch(() => false);
    check('works offline: navigating via the menu', navOk);
    await page.goto(`${BASE}/grammar/topic?id=a2-perfekt`);
    const topicOffline = await page
      .getByRole('button', { name: /^Practise \(\d+\)/ })
      .waitFor({ timeout: 10000 })
      .then(() => true)
      .catch(() => false);
    check('works offline: grammar lesson (page with query)', topicOffline);
    await context.setOffline(false);
    offline = false;
  }

  // ── mobile layout ─────────────────────────────────────
  const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
  const m = await mobile.newPage();
  await m.goto(`${BASE}/placement`);
  await m.getByRole('button', { name: /Begin the test|Resume/ }).first().waitFor();
  const bottomNav = await m.locator('nav[aria-label="Main"]').last().isVisible();
  check('mobile bottom navigation visible', bottomNav);
  const overflow = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
  check('no horizontal overflow on mobile', !overflow);
  await shot(m, '06-mobile-placement');
  for (const path of ['/grammar/topic?id=b1-adjektivdeklination', '/reading/text?id=b2-schlaf', '/learn']) {
    await m.goto(`${BASE}${path}`);
    await m.getByRole('heading').first().waitFor({ timeout: 15000 });
    const wide = await m.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    check(`no horizontal overflow on mobile: ${path}`, !wide);
  }
  await shot(m, '15-mobile-learn');
  await mobile.close();

  check('no uncaught page errors', errors.length === 0, errors.slice(0, 3).join(' | '));
} catch (err) {
  check('unexpected failure', false, String(err));
  await shot(page, 'zz-failure');
} finally {
  await browser.close();
}

const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
