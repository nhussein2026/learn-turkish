import { z } from 'zod';
import { CEFRLevel, Translation, ContributorMeta } from './shared';

// ============================================================
// Multilingual Explanation
// Long-form explanation in each supported language
// ============================================================
const Explanation = z.object({
  en: z.string().optional(),
  ar: z.string().optional(),
});

// ============================================================
// Grammar Rule Schema
// Structured grammar rules with cross-references to suffixes
// and example sentences.
// ============================================================
export const GrammarSchema = z.object({
  id: z.string(),
  title: Translation,                          // { en: "Present Continuous Tense", ar: "..." }
  cefr: CEFRLevel,
  explanation: Explanation,
  suffixes: z.array(z.string()).default([]),    // suffix IDs
  examples: z.array(z.string()).default([]),    // sentence IDs
  order: z.number().int(),                     // display order within level
  tags: z.array(z.string()).default([]),
  meta: ContributorMeta,
});

export type Grammar = z.infer<typeof GrammarSchema>;
