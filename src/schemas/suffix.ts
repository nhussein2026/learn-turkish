import { z } from 'zod';
import { CEFRLevel, Translation, ContributorMeta } from './shared';

// ============================================================
// Suffix Example — shows base word → suffixed form
// ============================================================
const SuffixUsageExample = z.object({
  base: z.string(),         // "gel"
  result: z.string(),       // "geliyorum"
  meaning: Translation,     // { en: "I am coming" }
});

// ============================================================
// Suffix Schema
// Turkish suffixes are the heart of the agglutinative system.
// Each suffix has vowel harmony variants and usage examples.
// ============================================================
export const SuffixSchema = z.object({
  id: z.string(),
  suffix: z.string(),                          // "-yor"
  variants: z.array(z.string()).default([]),    // ["-ıyor","-iyor","-uyor","-üyor"]
  type: z.enum([
    'tense', 'case', 'derivational', 'possessive',
    'plural', 'question', 'negation', 'person', 'other'
  ]),
  title: Translation,
  explanation: z.object({
    en: z.string().optional(),
    ar: z.string().optional(),
  }),
  vowelHarmony: z.enum(['e-type', 'i-type', 'none']).optional(),
  examples: z.array(SuffixUsageExample).default([]),
  cefr: CEFRLevel,
  order: z.number().int().optional(),
  meta: ContributorMeta,
});

export type Suffix = z.infer<typeof SuffixSchema>;
