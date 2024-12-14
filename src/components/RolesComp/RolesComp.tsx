import { useState, useMemo } from 'react'
import { Tooltip } from 'antd'

const RolesComp = ({ roles }: any) => {
  const isPermission = typeof roles[0] === 'string'
  const limitedRoles = roles.slice(0, 2)
  const [arrow, _setArrow] = useState('Show')
  const mergedArrow = useMemo(() => {
    return {
      pointAtCenter: true,
    }
  }, [arrow])
  const changeLabel = (permission: string) => {
    permission = permission.replace('get', 'view')
    permission = permission.replace('posts', 'popup')
    return permission
  }
  return (
    <div className="roles-container">
      {limitedRoles.length < 1 ? (
        <span className="empty-case">-</span>
      ) : (
        limitedRoles.map((role: any, i: number) => (
          <span
            style={{
              color: '#333',
              backgroundColor: '#eee',
            }}
            key={i}
          >
            {isPermission ? changeLabel(role) : changeLabel(role.name)}
          </span>
        ))
      )}
      {roles.length > 2 && (
        <Tooltip
          placement="bottom"
          title={
            <div>
              {roles.slice(2).map((role: any, i: number) => (
                <div key={i}>{isPermission ? changeLabel(role) : changeLabel(role.name)}</div>
              ))}
            </div>
          }
          arrow={mergedArrow}
        >
          <span className="more-roles">+{roles.length - 2} ...</span>
        </Tooltip>
      )}
    </div>
  )
}

export default RolesComp
