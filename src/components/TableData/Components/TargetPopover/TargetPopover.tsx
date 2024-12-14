import { Popover } from 'antd'

import { TbTargetArrow } from 'react-icons/tb'
const TargetPopover = ({ target }: { target: string }) => {
  return (
    <Popover
      placement="bottom"
      content={<div className="target-user-container">{target}</div>}
      trigger="hover"
    >
      <TbTargetArrow className="target-user-icon" />
    </Popover>
  )
}

export default TargetPopover
