import { ReactNode } from 'react'
import CountUp from 'react-countup'

interface ISectionHeader {
  title: string | ReactNode
  length?: number
  btn_title?: string
  Icon?: ReactNode
  handleClick?: () => void
  children?: ReactNode
  disabled?: boolean
  className?: string
}

export default function SectionHeader({
  children,
  title,
  length,
  handleClick,
  Icon,
  btn_title,
  disabled = false,
  className,
}: ISectionHeader) {
  return (
    <div className={`profile_container_header ${className}`}>
      <div className="profile_container_header_title">
        <p className="header_section_title">
          {title}
          {length != null && <CountUp end={length} className="header_section_length" />}
        </p>
      </div>
      <div className="header_section_btns_actions">
        {children}
        {(Icon || btn_title) && (
          <button
            className={`header_section_btn_new_user ${disabled ? 'disabled' : ''}`}
            onClick={handleClick}
            disabled={disabled}
          >
            {Icon}
            <span>{btn_title}</span>
          </button>
        )}
      </div>
    </div>
  )
}
