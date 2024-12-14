import React from 'react'
import { NavLink } from 'react-router-dom'
import { Tooltip } from 'antd'
import { ReactComponent as Arrow_Right } from '@src/assets/images/sidebar/v2/ArrowRight.svg'
import { logout } from '@src/store/slices/auth/authSlice'
import { useAppDispatch, useAppSelector } from '@src/store'

interface AccountViewProps {
  head: {
    navigator: string
  }
  body: {
    icon: React.ElementType
    title: string
    navigator: string
  }[]
  footer: {
    icon: React.ElementType
    title: string
    navigator: string
  }
}

const AccountView: React.FC<AccountViewProps> = ({ head, body, footer }) => {
  const { name, email, avatar } = useAppSelector((state) => {
    const user = state.auth.user
    return {
      name: user?.name,
      email: user?.email,
      avatar: user?.avatar,
    }
  })
  console.log(name, email, avatar)

  const dispatch = useAppDispatch()
  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div className="account_view">
      <NavLink to={head.navigator} className="account_view_header">
        <img
          src={`${avatar}`}
          alt={name}
          className="account_view_header_avatar"
          crossOrigin="anonymous"
        />
        <div className="account_view_header_info">
          <Tooltip title={name}>
            <span className="account_view_header_name">{name}</span>
          </Tooltip>
          <Tooltip title={email}>
            <span className="account_view_header_email">{email}</span>
          </Tooltip>
        </div>
      </NavLink>
      <div className="account_view_body">
        {body?.map((el: any, index: number) => (
          <NavLink key={index} to={el.navigator} className="account_view_body_item">
            <div>
              <el.icon />
              <span className="account_view_body_item_title">{el?.title}</span>
            </div>
            <Arrow_Right className="account_view_body_item_Arrow_Right" />
          </NavLink>
        ))}
      </div>
      <div className="account_view_footer">
        <div className="account_view_footer_item" onClick={handleLogout}>
          <div>
            <footer.icon />
            <span className="account_view_footer_title">{footer?.title}</span>
          </div>
          <Arrow_Right className="account_view_footer_item_Arrow_Right" />
        </div>
      </div>
    </div>
  )
}

export default AccountView
