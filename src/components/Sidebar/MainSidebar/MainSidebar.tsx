import { getSidebar } from '@src/utils/sidebar'
import Logo from '../../Logo/Logo'
import Item from './Item/Item'
import { useTranslation } from 'react-i18next'

const MainSidebar = () => {
  const { t } = useTranslation('layout')
  const SIDEBAR = getSidebar(t)
  const { top: topItems = [], bottom: bottomItems = [] } = SIDEBAR || {}
  const renderTopItems = topItems.map((el, index) => <Item {...el} key={index} />)

  const renderBottomItems = bottomItems.map((el, index) => <Item {...el} key={index} />)
  return (
    <div className="main_sidebar">
      <div className="main_menu_side">
        <div className="main_first_menu_side">
          <Logo className="main_sidebar_logo" />
          {renderTopItems}
        </div>
        <div className="main_second_menu_side">{renderBottomItems}</div>
      </div>
    </div>
  )
}

export default MainSidebar
