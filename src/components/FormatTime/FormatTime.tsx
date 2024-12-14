interface FormatTimePops {
  originalTime: string
  isCommentDate?: boolean
}

const FormatTime = ({ originalTime, isCommentDate }: FormatTimePops) => {
  const formatTime = (timeString: string) => {
    const dateObj = new Date(timeString)

    const day = dateObj.getDate().toString().padStart(2, '0')
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0')
    const year = dateObj.getFullYear()
    const hours = dateObj.getHours().toString().padStart(2, '0')
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')

    return `${day}/${month}/${year} ${hours}:${minutes}`
  }

  const formattedTime = formatTime(originalTime)

  return (
    <div>
      <p
        style={{ textAlign: 'center' }}
        className={`${isCommentDate ? 'coment-date' : 'table-data-user-field format-time'}`}
      >
        {formattedTime || '-'}
      </p>
    </div>
  )
}
export default FormatTime
