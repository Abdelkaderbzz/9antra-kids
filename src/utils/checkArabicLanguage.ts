const isArabic = (str: string) => {
  const arabicRegex = /[\u0600-\u06FF\u0750-\u077F]/
  return arabicRegex.test(str)
}

export const getTextDirection = (words: string) => {
  words = words?.trim()
  if (words?.length > 0) {
    return isArabic(words[0]) ? 'rtl' : 'ltr'
  }
  return 'ltr'
}
