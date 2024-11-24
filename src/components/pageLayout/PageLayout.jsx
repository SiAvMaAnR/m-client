import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { section } from '../../constants/system'
import AccountSection from '../common/PageSection/AccountSection/AccountSection'
import './PageLayout.scss'

const sectionMapper = (data) => ({
  [section.account]: <AccountSection data={data} />
})

function PageLayout({ page }) {
  const { type, isActive, data } = useSelector((state) => state.section.pageSection)

  return (
    <div className="page-layout">
      <div className="page-wrapper">{page}</div>

      <div className={`page-section-wrapper ${isActive ? 'active' : ''}`}>
        {sectionMapper(data)[type]}
      </div>
    </div>
  )
}

PageLayout.propTypes = {
  page: PropTypes.element.isRequired
}

export default PageLayout
