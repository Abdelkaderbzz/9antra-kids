export function removeDuplicatesById<T extends { _id: string }>(arr: T[]): T[] {
  const seenIds = new Set<string>()
  return arr.filter((item) => {
    if (seenIds.has(item._id)) {
      return false
    } else {
      seenIds.add(item._id)
      return true
    }
  })
}
