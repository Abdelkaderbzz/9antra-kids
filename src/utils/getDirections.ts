export const getDirections = () => {
  const textDirections: string[] = []
  const allEditors = document.querySelectorAll('.sun-editor-editable')
  allEditors?.forEach((editor) => {
    if (!editor.querySelector('img')) {
      editor?.classList?.value?.includes('se-rtl')
        ? textDirections?.push('rtl')
        : textDirections?.push('ltr')
    }
  })
  return textDirections
}
