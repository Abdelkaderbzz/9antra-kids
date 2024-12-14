interface Taudience {
  name: string
  memberId: string
}
export const isListOfAudienceContainsThisAudience = (arr: Taudience[], obj: Taudience) => {
  for (let i = 0; i < arr?.length; i++) {
    if (arr[i].memberId === obj.memberId) {
      return true
    }
  }
  return false
}
