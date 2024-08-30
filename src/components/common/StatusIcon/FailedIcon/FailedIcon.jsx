import PropTypes from 'prop-types'
import './FailedIcon.scss'

function FailedIcon({ className = '' }) {
  return (
    <div className={`c-failed-icon ${className}`}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        version="1.1"
        width="256"
        height="256"
        viewBox="0 0 256 256"
        xmlSpace="preserve"
      >
        <g
          style={{
            stroke: 'none',
            strokeWidth: 0,
            strokeDasharray: 'none',
            strokeLinecap: 'butt',
            strokeLinejoin: 'miter',
            strokeMiterlimit: 10,
            fill: 'none',
            fillRule: 'nonzero',
            opacity: 1
          }}
          transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
        >
          <path
            d="M 45 90 C 20.187 90 0 69.813 0 45 C 0 20.187 20.187 0 45 0 c 24.813 0 45 20.187 45 45 C 90 69.813 69.813 90 45 90 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: '#945DDA',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <path
            d="M 45 57.469 L 45 57.469 c -1.821 0 -3.319 -1.434 -3.399 -3.252 L 38.465 23.95 c -0.285 -3.802 2.722 -7.044 6.535 -7.044 h 0 c 3.813 0 6.82 3.242 6.535 7.044 l -3.137 30.267 C 48.319 56.036 46.821 57.469 45 57.469 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
          <circle
            cx="45"
            cy="67.67"
            r="5.42"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(255,255,255)',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform="  matrix(1 0 0 1 0 0) "
          />
        </g>
      </svg>
    </div>
  )
}

FailedIcon.propTypes = {
  className: PropTypes.string
}

export default FailedIcon
