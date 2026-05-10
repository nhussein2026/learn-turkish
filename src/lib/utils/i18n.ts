import en from '../i18n/en.yaml';
import ar from '../i18n/ar.yaml';
import tr from '../i18n/tr.yaml';

const translations = { en, ar, tr } as const;
export type Locale = keyof typeof translations;

/**
 * Get a translated string by key.
 * Supports nested keys like 'nav.home'
 */
export function t(locale: Locale, key: string): string {
  const keys = key.split('.');
  let result: any = translations[locale];
  
  for (const k of keys) {
    if (result && typeof result === 'object' && k in result) {
      result = result[k];
    } else {
      console.warn(`Translation key "${key}" not found for locale "${locale}"`);
      return key;
    }
  }
  
  return typeof result === 'string' ? result : key;
}

/**
 * Get all translations for a specific locale
 */
export function getTranslations(locale: Locale) {
  return translations[locale];
}
