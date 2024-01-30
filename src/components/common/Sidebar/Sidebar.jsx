import { useState } from 'react'
import SidebarItem from './SidebarItem/SidebarItem'
import './Sidebar.scss'

function Sidebar() {
  const [expand, setExpand] = useState(false)

  const expandHandler = () => {
    setExpand(!expand)
  }

  const style = {
    expand: expand ? 'expand' : ''
  }

  return (
    <div className={`c-sidebar ${style.expand}`}>
      <button type="button" onClick={expandHandler}>
        EXPAND
      </button>
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
      <SidebarItem />
    </div>
  )
}

Sidebar.propTypes = {}

export default Sidebar
