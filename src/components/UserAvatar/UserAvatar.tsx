import { useAppSelector } from '@src/store'
import { Avatar } from 'antd'

const UserAvatar = () => {
  const { user } = useAppSelector((state) => state.auth)
  return (
    <Avatar
      src={
        <img
          style={{ objectFit: 'cover' }}
          src={`${user?.avatar}`}
          alt="User"
          className="default-avatar"
          crossOrigin="anonymous"
        />
      }
    />
  )
}

export default UserAvatar
