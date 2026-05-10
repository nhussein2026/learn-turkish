import { z } from 'zod';
import { CEFRLevel, PartOfSpeech, Translation, AudioRef, ContributorMeta } from './shared';

// ============================================================
// Suffix Example — shows how a suffix attaches to this word
// ============================================================
const SuffixExample = z.object({
  form: z.string(),                 // "geliyorum"
  suffixes: z.array(z.string()),    // ["-iyor", "-um"]
  meaning: Translation,
});

// ============================================================
// Morphology — Turkish-specific agglutinative morphology
// ============================================================
const Morphology = z.object({
  root: z.string(),                           // "gel"
  suffixExamples: z.array(SuffixExample).default([]),
  conjugation: z.object({
    type: z.enum(['regular', 'irregular', 'compound']).default('regular'),
    group: z.string().optional(),             // "e-type verb", "a-type verb"
  }).optional(),
});

// ============================================================
// Word Schema
// The core data unit of the platform. Each Turkish word is one entry.
// ============================================================
export const WordSchema = z.object({
  id: z.string(),                              // unique slug: "gelmek"
  turkish: z.string(),                         // lemma/dictionary form
  pos: PartOfSpeech,
  translations: Translation,                   // { en: "to come", ar: "يأتي" }
  cefr: CEFRLevel,
  frequencyRank: z.number().int().positive().optional(),
  root: z.string().optional(),                 // "gel-"
  relatedWords: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  categories: z.array(z.string()).default([]),
  morphology: Morphology.optional(),
  exampleSentences: z.array(z.string()).default([]),
  audio: AudioRef.optional(),
  meta: ContributorMeta,
});

export type Word = z.infer<typeof WordSchema>;
