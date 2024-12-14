import { ReactComponent as Avatar } from '@assets/icons/user/Avatar.svg'

const NameRow = (item: any) =>
  (
    <div className="table_users_user_avatar" title={item?.fullName}>
      <div className="row_user_avatar">
        <Avatar /> <span>{item?.fullName}</span>
      </div>
    </div>
  ) || '-'

export default NameRow
