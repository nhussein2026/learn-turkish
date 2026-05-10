import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { WordSchema } from '../src/schemas/word';
import { SentenceSchema } from '../src/schemas/sentence';
import { GrammarSchema } from '../src/schemas/grammar';
import { SuffixSchema } from '../src/schemas/suffix';
import { CategorySchema } from '../src/schemas/category';

const CONTENT_DIR = path.resolve(process.cwd(), 'src/content');

async function validate() {
  console.log('🚀 Starting content validation...');
  let errorCount = 0;

  const collections = [
    { name: 'words', schema: WordSchema },
    { name: 'sentences', schema: SentenceSchema },
    { name: 'grammar', schema: GrammarSchema },
    { name: 'suffixes', schema: SuffixSchema },
    { name: 'categories', schema: CategorySchema },
  ];

  const allWordIds = new Set<string>();

  for (const collection of collections) {
    const dir = path.join(CONTENT_DIR, collection.name);
    if (!fs.existsSync(dir)) continue;

    const files = fs.readdirSync(dir).filter(f => f.endsWith('.yaml'));
    console.log(`\n📂 Validating ${collection.name} (${files.length} files)...`);

    for (const file of files) {
      const filePath = path.join(dir, file);
      const content = yaml.load(fs.readFileSync(filePath, 'utf8'));

      const result = collection.schema.safeParse(content);
      if (!result.success) {
        console.error(`❌ [${collection.name}] ${file}:`);
        console.error(result.error.format());
        errorCount++;
      } else {
        if (collection.name === 'words') {
          allWordIds.add((result.data as any).id);
        }
      }
    }
  }

  // Cross-reference validation
  console.log('\n🔗 Checking cross-references...');
  const sentenceDir = path.join(CONTENT_DIR, 'sentences');
  if (fs.existsSync(sentenceDir)) {
    const sentences = fs.readdirSync(sentenceDir).filter(f => f.endsWith('.yaml'));
    for (const file of sentences) {
      const content = yaml.load(fs.readFileSync(path.join(sentenceDir, file), 'utf8')) as any;
      if (content.wordRefs) {
        for (const ref of content.wordRefs) {
          if (!allWordIds.has(ref)) {
            console.error(`❌ [sentences] ${file}: Word reference "${ref}" not found in words collection.`);
            errorCount++;
          }
        }
      }
    }
  }

  if (errorCount > 0) {
    console.error(`\n💥 Validation failed with ${errorCount} errors.`);
    process.exit(1);
  } else {
    console.log('\n✅ All content is valid!');
  }
}

validate().catch(err => {
  console.error(err);
  process.exit(1);
});
