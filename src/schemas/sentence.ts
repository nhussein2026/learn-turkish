import { z } from 'zod';
import { CEFRLevel, Translation, AudioRef, ContributorMeta } from './shared';

// ============================================================
// Sentence Schema
// Real Turkish sentences with translations and word references.
// Used for: example sentences, sentence mining, listening drills.
// ============================================================
export const SentenceSchema = z.object({
  id: z.string(),
  turkish: z.string(),
  translations: Translation,
  cefr: CEFRLevel,
  wordRefs: z.array(z.string()).default([]),   // word IDs used in this sentence
  tags: z.array(z.string()).default([]),
  audio: AudioRef.optional(),
  context: z.enum(['formal', 'casual', 'literary', 'business', 'academic']).optional(),
  source: z.string().optional(),               // attribution
  meta: ContributorMeta,
});

export type Sentence = z.infer<typeof SentenceSchema>;
