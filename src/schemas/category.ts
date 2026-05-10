import { z } from 'zod';
import { Translation, ContributorMeta } from './shared';

// ============================================================
// Category Schema
// Topic groupings for words (family, food, travel, etc.)
// ============================================================
export const CategorySchema = z.object({
  id: z.string(),
  title: Translation,
  description: Translation,
  icon: z.string().optional(),                 // emoji or icon name
  color: z.string().optional(),                // hex color for UI
  wordRefs: z.array(z.string()).default([]),   // word IDs in this category
  order: z.number().int().optional(),
  meta: ContributorMeta,
});

export type Category = z.infer<typeof CategorySchema>;
