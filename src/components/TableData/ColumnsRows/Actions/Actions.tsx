import { ReactNode, useState } from 'react'
import { Popover } from 'antd'
import { BsThreeDots } from 'react-icons/bs'

export type SetPopoverVisibleFunction = (visible: boolean) => void
export type ChildPropsActions = {
  id: string
  setPopoverVisible: SetPopoverVisibleFunction
}
type ContentFunction = (setPopoverVisible: SetPopoverVisibleFunction) => ReactNode

interface ActionsProps {
  content: ContentFunction
}

export const ButtonsActions: React.FC<any> = ({ actionsConfig, ...props }) => (
  <div className="action-popup">
    {actionsConfig.map((action: any) => (
      <button
        key={action.title}
        className={`action-popup-button ${props.className}`}
        onClick={action.handleclick}
        {...props}
      >
        {action.icon}
        <span>{action.title}</span>
      </button>
    ))}
  </div>
)

const Actions: React.FC<ActionsProps> = ({ content }) => {
  const [popoverVisible, setPopoverVisible] = useState(false)
  const handleOpenChange = (visible: boolean) => {
    setPopoverVisible(visible)
  }

  return (
    <Popover
      placement="bottom"
      trigger="hover"
      overlayClassName="popover_action_popup"
      content={content(setPopoverVisible)}
      open={popoverVisible}
      onOpenChange={handleOpenChange}
    >
      <button className="table_data_actions">
        <BsThreeDots />
      </button>
    </Popover>
  )
}

export default Actions
