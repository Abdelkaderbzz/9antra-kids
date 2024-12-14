export function blockSpace(targetString: string) {
  return targetString.replace(/\b(\w+)\s/g, function (_match, group) {
    return group
  })
}
