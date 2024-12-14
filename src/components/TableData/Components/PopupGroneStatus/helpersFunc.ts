export const isDateInFuture = (start: any, end: any) => {
  try {
    const endDate = new Date(
      end.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'),
    )
    const startDate = new Date(
      start.replace(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2})/, '$3-$2-$1T$4:$5'),
    )
    const currentDate = new Date()

    if (currentDate >= startDate && currentDate <= endDate) {
      return 'Running'
    } else if (currentDate < startDate) {
      return 'Pending'
    } else if (currentDate > endDate) {
      return 'Finished'
    }
  } catch (error) {
    return null
  }
}
