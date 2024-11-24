import PropTypes from 'prop-types'
import Sidebar from '../Sidebar/Sidebar'
import PageLayout from '../../pageLayout/PageLayout'
import './SidebarLayout.scss'

function SidebarLayout({ page }) {
  return (
    <div className="c-sidebar-layout">
      <Sidebar />
      <PageLayout page={page} />
    </div>
  )
}

SidebarLayout.propTypes = {
  page: PropTypes.element.isRequired
}

export default SidebarLayout
