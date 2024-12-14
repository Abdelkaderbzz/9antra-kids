import { Tooltip } from 'antd'

const RolesRow = (item: any) => (
  <div className="table_users_roles">
    {item?.roles.length > 1 ? (
      <>
        <p className="table_users_role_name">{item?.roles[0]?.name}</p>
        <Tooltip
          placement="bottom"
          title={
            <div>
              {item?.roles.slice(1).map((role: any, i: number) => <div key={i}>{role.name}</div>)}
            </div>
          }
        >
          <span className="more_roles"> +{item?.roles?.length - 1} ...</span>
        </Tooltip>
      </>
    ) : item?.roles.length === 1 ? (
      <p className="table_users_role_name"> {item?.roles[0]?.name}</p>
    ) : (
      '-'
    )}
  </div>
)

export default RolesRow
