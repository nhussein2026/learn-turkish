import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { WordSchema } from './schemas/word';
import { SentenceSchema } from './schemas/sentence';
import { GrammarSchema } from './schemas/grammar';
import { SuffixSchema } from './schemas/suffix';
import { CategorySchema } from './schemas/category';

const words = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/words" }),
  schema: WordSchema,
});

const sentences = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/sentences" }),
  schema: SentenceSchema,
});

const grammar = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/grammar" }),
  schema: GrammarSchema,
});

const suffixes = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/suffixes" }),
  schema: SuffixSchema,
});

const categories = defineCollection({
  loader: glob({ pattern: "**/*.yaml", base: "./src/content/categories" }),
  schema: CategorySchema,
});

export const collections = { words, sentences, grammar, suffixes, categories };
