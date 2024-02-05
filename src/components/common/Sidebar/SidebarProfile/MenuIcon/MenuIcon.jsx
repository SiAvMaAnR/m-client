import PropTypes from 'prop-types'
import './MenuIcon.scss'

function MenuIcon({ className }) {
  return (
    <div className={`c-menu-icon ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fill="#000000"
          fillRule="evenodd"
          d="M12 3a2 2 0 10-4 0 2 2 0 004 0zm-2 5a2 2 0 110 4 2 2 0 010-4zm0 7a2 2 0 110 4 2 2 0 010-4z"
        />
      </svg>
    </div>
  )
}

MenuIcon.defaultProps = {
  className: ''
}

MenuIcon.propTypes = {
  className: PropTypes.string
}

export default MenuIcon
