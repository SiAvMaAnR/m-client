import PropTypes from 'prop-types'
import Sidebar from '../Sidebar/Sidebar'
import './SidebarLayout.scss'

function SidebarLayout({ page }) {
  return (
    <div className="c-sidebar-layout">
      <Sidebar />
      <div className="page-wrapper">{page}</div>
    </div>
  )
}

SidebarLayout.propTypes = {
  page: PropTypes.element.isRequired
}

export default SidebarLayout
