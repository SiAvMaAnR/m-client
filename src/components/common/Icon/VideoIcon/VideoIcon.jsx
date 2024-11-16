import PropTypes from 'prop-types'
import './VideoIcon.scss'

function VideoIcon({ className = '', onClick = () => {} }) {
  return (
    <div onClick={onClick} className={`c-file-icon ${className}`} role="presentation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 6C3 4.34315 4.34315 3 6 3H14C15.6569 3 17 4.34315 17 6V14C17 15.6569 15.6569 17 14 17H6C4.34315 17 3 15.6569 3 14V6Z"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21 7V18C21 19.6569 19.6569 21 18 21H7"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9 12V8L12.1429 10L9 12Z"
          fill="#000000"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

VideoIcon.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default VideoIcon
