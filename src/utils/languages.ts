export type LanguageKeysType = keyof typeof languages

export type LanguageType = (typeof languages)['en-US']

export const checkLanguage = (localStorage.getItem('i18nextLng') || 'en-US') as LanguageKeysType

export const setLanguage = (language: LanguageKeysType) =>
  localStorage.setItem('i18nextLng', language)

export const languages = {
  'en-US': [
    { label: 'English', value: 'en-US' },
    { label: 'Arabic', value: 'ar' },
  ],
  ar: [
    { label: 'الإنجليزية', value: 'en-US' },
    { label: 'العربية', value: 'ar' },
  ],
}
