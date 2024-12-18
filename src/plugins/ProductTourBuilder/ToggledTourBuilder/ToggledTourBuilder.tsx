import { useState, SetStateAction, Dispatch } from 'react'
import { GoChevronUp } from 'react-icons/go'
import { ReactComponent as PopupsLogo } from './../../assets/popupsLogo.svg'
interface IToggledTourBuilder {
  setIsVisible: Dispatch<SetStateAction<boolean>>
}
const ToggledTourBuilder = ({ setIsVisible }: IToggledTourBuilder) => {
  const [isHovred, setIsHovred] = useState(false)
  const handleClick = () => {
    setIsVisible(true), setIsHovred(false)
  }
  const handleMouseOver = () => {
    setIsHovred(true)
  }
  const handleMouseLeave = () => {
    setIsHovred(false)
  }
  return (
    <div
      onClick={handleClick}
      onMouseOver={handleMouseOver}
      onMouseLeave={handleMouseLeave}
      style={isHovred ? { height: '55px' } : {}}
      className={'tour__bottom-bar'}
    >
      <span className="tour-first-span">
        <GoChevronUp />
      </span>
      <div className="tour-second-span">
        <PopupsLogo className="popups-logo-toggled" />
      </div>
    </div>
  )
}

export default ToggledTourBuilder
