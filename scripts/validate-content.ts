/**
 * Validates the hand-written content. Usage: npm run validate:content
 */
import { validateGrammar, validateOutputContent, validatePlacementBank, validateTexts } from '../lib/content-validation';

const placement = validatePlacementBank();
console.log('Placement bank (items per skill × level):');
console.table(placement.counts);

const grammar = validateGrammar();
console.log('\nGrammar (lessons and exercises per level):');
console.table(grammar.counts);

const texts = validateTexts();
console.log('\nReading texts and listening scripts per level:');
console.table(texts.counts);

const output = validateOutputContent();
console.log('\nWriting tasks and conversation scenarios per level:');
console.table(output.counts);

const errors = [...placement.errors, ...grammar.errors, ...texts.errors, ...output.errors];
if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(' •', e);
  process.exit(1);
}
console.log('\nAll content checks passed.');
