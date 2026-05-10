import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const lessons = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/lessons" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    sourceLang: z.enum(['en', 'ar']),
    skill: z.enum(['reading', 'writing', 'listening', 'speaking', 'grammar', 'vocabulary']),
    level: z.enum(['A1', 'A2', 'B1', 'B2', 'C1', 'C2']),
    order: z.number().optional(),
  }),
});

export const collections = { lessons };
