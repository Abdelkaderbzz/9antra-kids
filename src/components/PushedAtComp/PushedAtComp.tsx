import { useState, useMemo } from 'react'
import { Tooltip } from 'antd'
import FormatTime from '@src/components/FormatTime/FormatTime'
const PushedAtComp = ({ data }: any) => {
  const limitedate = data.slice(0, 1)
  const [arrow, _setArrow] = useState('Show')
  const mergedArrow = useMemo(() => {
    return {
      pointAtCenter: true,
    }
  }, [arrow])
  return (
    <div className="roles-container">
      {limitedate.length < 1 ? (
        <span className="empty-case">-</span>
      ) : (
        limitedate.map((date: any, i: number) => (
          <span
            style={{
              color: '#333',
              backgroundColor: '#eee',
            }}
            key={i}
          >
            <FormatTime originalTime={date} />
          </span>
        ))
      )}
      {data.length > 1 && (
        <Tooltip
          placement="bottom"
          title={
            <div>
              {data.slice(1).map((date: any, i: number) => (
                <div key={i}>
                  <FormatTime originalTime={date} />
                </div>
              ))}
            </div>
          }
          arrow={mergedArrow}
        >
          <span className="more-roles">+{data.length - 1} ...</span>
        </Tooltip>
      )}
    </div>
  )
}

export default PushedAtComp
