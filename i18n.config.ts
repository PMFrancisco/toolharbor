import type { I18nConfig } from 'next-i18next/proxy';

const i18nConfig: I18nConfig = {
  supportedLngs: ['en', 'es'],
  fallbackLng: 'en',
  defaultNS: 'common',
  ns: ['common', 'tools-registry'],
  localeInPath: true,
  hideDefaultLocale: true,
  resourceLoader: (language, namespace) => import(`./locales/${language}/${namespace}.json`),
};

export default i18nConfig;
