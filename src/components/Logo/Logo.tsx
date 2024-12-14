import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as PopupsLogo } from '@src/assets/images/auth/bg_section2.svg'

type LogoProps = {
  navigateTo?: string
  className?: string
}

const Logo: React.FC<LogoProps> = ({ ...props }) => {
  return (
    <Link to={props?.navigateTo || ''} className={props?.className}>
      <h1 className="logo">
        <PopupsLogo />
      </h1>
    </Link>
  )
}

export default Logo
