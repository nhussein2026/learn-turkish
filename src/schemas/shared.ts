import { z } from 'zod';

// ============================================================
// CEFR Proficiency Levels
// Common European Framework of Reference for Languages
// ============================================================
export const CEFRLevel = z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']);
export type CEFRLevel = z.infer<typeof CEFRLevel>;

// ============================================================
// Part of Speech
// Covers all Turkish parts of speech including postpositions
// (Turkish has postpositions, not prepositions)
// ============================================================
export const PartOfSpeech = z.enum([
  'noun',
  'verb',
  'adjective',
  'adverb',
  'pronoun',
  'postposition',
  'conjunction',
  'interjection',
  'determiner',
  'particle',
  'numeral',
]);
export type PartOfSpeech = z.infer<typeof PartOfSpeech>;

// ============================================================
// Translation
// Multilingual translation object. Each field is a language code.
// Adding a new language = adding one optional field here.
// ============================================================
export const Translation = z.object({
  en: z.string().optional(),
  ar: z.string().optional(),
  // Future: fr, de, es, etc.
});
export type Translation = z.infer<typeof Translation>;

// ============================================================
// Audio Reference
// Points to an audio file in public/audio/
// ============================================================
export const AudioRef = z.object({
  file: z.string(),
  speaker: z.string().optional(),
  accent: z.string().optional(),
});
export type AudioRef = z.infer<typeof AudioRef>;

// ============================================================
// Contributor Metadata
// Tracks who added/verified content
// ============================================================
export const ContributorMeta = z.object({
  addedBy: z.string().optional(),
  lastUpdated: z.string().optional(),
  verified: z.boolean().default(false),
}).default({});
export type ContributorMeta = z.infer<typeof ContributorMeta>;
