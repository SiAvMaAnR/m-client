import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './NavLink.scss'

function NavLink({ children, link, className }) {
  return (
    <Link to={link} className={`c-nav-link ${className}`}>
      {children}
    </Link>
  )
}

NavLink.defaultProps = {
  children: '',
  link: '',
  className: ''
}

NavLink.propTypes = {
  children: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string
}

export default NavLink
