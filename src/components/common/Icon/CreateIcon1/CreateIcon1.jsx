import PropTypes from 'prop-types'
import './CreateIcon1.scss'

function CreateIcon1({ className = '', onClick = () => {} }) {
  return (
    <div className={`c-create-icon-1 ${className}`} onClick={onClick} role="presentation">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="800px"
        height="800px"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M9 17a1 1 0 102 0v-6h6a1 1 0 100-2h-6V3a1 1 0 10-2 0v6H3a1 1 0 000 2h6v6z"
        />
      </svg>
    </div>
  )
}

CreateIcon1.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func
}

export default CreateIcon1
