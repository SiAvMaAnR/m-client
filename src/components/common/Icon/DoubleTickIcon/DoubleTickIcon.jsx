import PropTypes from 'prop-types'
import './DoubleTickIcon.scss'

function DoubleTickIcon({ className }) {
  return (
    <div className={`c-double-tick-icon ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 16 16"
        version="1.1"
        fill="none"
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      >
        <path d="m1.75 9.75 2.5 2.5m3.5-4 2.5-2.5m-4.5 4 2.5 2.5 6-6.5" />
      </svg>
    </div>
  )
}

DoubleTickIcon.defaultProps = {
  className: ''
}

DoubleTickIcon.propTypes = {
  className: PropTypes.string
}

export default DoubleTickIcon
