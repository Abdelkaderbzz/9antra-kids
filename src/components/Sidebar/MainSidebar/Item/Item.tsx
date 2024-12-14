import { useLocation, useNavigate } from 'react-router-dom'
import { Popover } from 'antd'
import UserAvatar from '@src/components/UserAvatar/UserAvatar'

const Item = ({ ...props }) => {
  const navigator = useNavigate()
  const location = useLocation()
  const handleSideBarManu = ({ ...params }) => {
    if (params.navigator) {
      navigator(params?.navigator)
    }
  }
  const isActive = location.pathname === props?.navigator
  const content = () =>
    props?.title ? <div className="menu_item_popover_title">{props?.title}</div> : props?.subItems

  return (
    <Popover
      placement={props?.placement || 'right'}
      content={content}
      overlayClassName="menu_item_popover"
    >
      <button
        onClick={() =>
          handleSideBarManu({
            navigator: props?.navigator,
          })
        }
        className={`menu_item ${isActive ? 'active' : ''}`}
      >
        {props.placement === 'rightBottom' ? (
          <UserAvatar />
        ) : (
          <props.icon className="menu_item_icon" />
        )}
      </button>
    </Popover>
  )
}

export default Item
