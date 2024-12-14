export const isUrl = (inputString: string) => {
  const urlPattern = /^(?:http|https):\/\/\S+/
  return urlPattern.test(inputString)
}
