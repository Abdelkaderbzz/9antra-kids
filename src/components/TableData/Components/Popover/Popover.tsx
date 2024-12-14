import { Popover } from 'antd'

const PopoverV2 = ({ title }: any) => {
  return title ? (
    title.length > 20 ? (
      <Popover
        placement="bottom"
        content={<p style={{ fontSize: '12px', maxWidth: '220px' }}>{title}</p>}
        trigger="hover"
      >
        <pre className="popup-title-table-field">{title.substring(0, 20)}...</pre>
      </Popover>
    ) : (
      <pre className="popup-title-table-field">{title}</pre>
    )
  ) : (
    <pre className="popup-title-table-field-untitled">-</pre>
  )
}

export default PopoverV2
