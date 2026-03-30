export const locales = ['en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export const localeMap: Record<Locale, string> = {
  en: 'en_US',
  es: 'es_ES',
};
