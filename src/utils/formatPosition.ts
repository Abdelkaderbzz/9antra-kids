export const formatPosition = (position: string) => {
  switch (position) {
    case 'topR':
      return 'Top Right'
    case 'topL':
      return 'Top Left'
    case 'bottomL':
      return 'Bottom Left'
    case 'bottomR':
      return 'Bottom Right'
    default:
      return 'Center'
  }
}
