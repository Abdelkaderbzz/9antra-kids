import { Popover } from 'antd'
import { isDateInFuture } from './helpersFunc'

const PopupGroneStatus = ({ schedule, isCanceled, isDraft }: any) => {
  const newSchedule = schedule?.length > 0 ? schedule[0] : null
  const status: any = isDraft
    ? 'Draft'
    : isCanceled
      ? 'Canceled'
      : isDateInFuture(newSchedule?.startDate, newSchedule?.endDate)
  const content = (
    <div className="schedule-popover">
      <p>
        Start Date: <span>{newSchedule?.startDate}</span>
      </p>
      <p>
        End Date: <span>{newSchedule?.endDate}</span>
      </p>
    </div>
  )

  let statusClass = ''
  let statusText = ''
  if (status === 'Canceled') {
    statusClass = 'grone-canceled'
    statusText = status
  } else if (status === 'Running') {
    statusClass = 'grone-running'
    statusText = status
  } else if (status === 'Pending') {
    statusClass = 'grone-pending'
    statusText = status
  } else if (status === 'Finished') {
    statusClass = 'grone-finished'
    statusText = status
  } else if (status === 'Draft') {
    statusClass = 'grone-draft'
    statusText = 'Draft'
  }

  const renderStatus = (text: string, className: string) =>
    text === 'Draft' ? (
      <span className={className}>{text}</span>
    ) : (
      <Popover placement="bottom" content={content} trigger="hover">
        <span className={className}>{text}</span>
      </Popover>
    )
  return (
    <div className="popup-grone-status">{statusText && renderStatus(statusText, statusClass)}</div>
  )
}

export default PopupGroneStatus
