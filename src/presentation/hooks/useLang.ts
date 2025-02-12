import en from '@/presentation/locales/en';

export const LANGUAGE: string = import.meta.env['VITE_LANGUAGE'] || 'en';

export function useLang() {
  return { lang: LANGUAGE, t: en };
}
