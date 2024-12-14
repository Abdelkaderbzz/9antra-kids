import { Collapse } from 'antd'
import { useState } from 'react'
import { ReactComponent as ArrowIcon } from '@assets/icons/popupContent/arrow.svg'

interface IAccordion {
  title: JSX.Element
  content: JSX.Element
}
const Accordion = ({ title, content }: IAccordion) => {
  const [isCollapsed, setIsCollapsed] = useState<string | string[]>([])
  return (
    <Collapse
      ghost
      expandIcon={({ isActive }) => <ArrowIcon rotate={isActive ? 90 : -90} />}
      className={
        isCollapsed?.length > 0 ? 'accordion-container  accordion-active' : 'accordion-container'
      }
      onChange={(value) => setIsCollapsed(value)}
      expandIconPosition={'end'}
      items={[{ key: '1', label: title, children: content }]}
    />
  )
}

export default Accordion
