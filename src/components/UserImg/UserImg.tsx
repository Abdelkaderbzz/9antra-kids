interface UserImgProps {
  avatar: string
  name: string
}
const UserImg = ({ avatar, name }: UserImgProps) => {
  return (
    <div className="user-img">
      <img src={`${import.meta.env.VITE_APP_BASE_URL}/users/${avatar}`} crossOrigin="anonymous" />
      <span>{name}</span>
    </div>
  )
}

export default UserImg
