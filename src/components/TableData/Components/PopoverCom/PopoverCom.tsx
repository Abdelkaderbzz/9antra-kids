import { getTextDirection } from '@src/utils/checkArabicLanguage'
import { Popover } from 'antd'

const PopoverCom = ({ title }: any) => {
  const direction = getTextDirection(title)
  return title ? (
    title.length > 20 ? (
      <Popover placement="bottom" content={<p style={{ direction }}>{title}</p>} trigger="hover">
        <pre className="popup-title-table-field" style={{ direction }}>
          {title.substring(0, 12)}...
        </pre>
      </Popover>
    ) : (
      <pre className="popup-title-table-field" style={{ direction }}>
        {title}
      </pre>
    )
  ) : (
    <pre className="popup-title-table-field-untitled">Untitled</pre>
  )
}

export default PopoverCom
