import { Dispatch, SetStateAction } from 'react'
import MainSidebar from './MainSidebar/MainSidebar'

interface ISidebarProps {
  collapseSidebar: boolean
  setShowSidebar: Dispatch<SetStateAction<boolean>>
}

const Sidebar: React.FC<ISidebarProps> = ({}) => {
  return (
    <div className="sidebar">
      <MainSidebar />
    </div>
  )
}

export default Sidebar
