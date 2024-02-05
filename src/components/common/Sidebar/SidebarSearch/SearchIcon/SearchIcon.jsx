import PropTypes from 'prop-types'
import './SearchIcon.scss'

function SearchIcon({ className, isExpand }) {
  const expandClass = isExpand ? 'expand' : ''

  return (
    <div className={`c-search-icon ${className} ${expandClass}`}>
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
            d="M 88.271 79.927 L 71.011 62.666 c -0.631 -0.631 -1.574 -0.743 -2.327 -0.355 l -2.509 -2.509 c 11.408 -14.576 10.241 -35.733 -2.986 -48.96 C 56.197 3.851 46.902 0 37.015 0 S 17.833 3.851 10.842 10.842 C 3.851 17.833 0 27.128 0 37.015 s 3.851 19.182 10.842 26.173 c 7.171 7.172 16.671 10.798 26.191 10.798 c 8.04 0 16.095 -2.588 22.769 -7.812 l 2.509 2.509 c -0.388 0.753 -0.276 1.696 0.355 2.327 l 17.261 17.261 C 81.041 89.386 82.523 90 84.099 90 c 1.576 0 3.059 -0.614 4.173 -1.729 S 90 85.675 90 84.099 C 90 82.523 89.386 81.041 88.271 79.927 z M 58.596 58.596 c -5.95 5.95 -13.765 8.925 -21.581 8.925 c -7.815 0 -15.631 -2.975 -21.581 -8.925 c -11.9 -11.899 -11.9 -31.262 0 -43.162 c 11.9 -11.9 31.262 -11.899 43.162 0 C 70.496 27.333 70.496 46.696 58.596 58.596 z"
            style={{
              stroke: 'none',
              strokeWidth: 1,
              strokeDasharray: 'none',
              strokeLinecap: 'butt',
              strokeLinejoin: 'miter',
              strokeMiterlimit: 10,
              fill: 'rgb(0,0,0)',
              fillRule: 'nonzero',
              opacity: 1
            }}
            transform=" matrix(1 0 0 1 0 0) "
            strokeLinecap="round"
          />
        </g>
      </svg>
    </div>
  )
}

SearchIcon.defaultProps = {
  className: '',
  isExpand: false
}

SearchIcon.propTypes = {
  className: PropTypes.string,
  isExpand: PropTypes.bool
}

export default SearchIcon
