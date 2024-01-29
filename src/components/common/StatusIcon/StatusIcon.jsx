import PropTypes from 'prop-types'
import SuccessIcon from './SuccessIcon/SuccessIcon'
import FailedIcon from './FailedIcon/FailedIcon'
import './StatusIcon.scss'

function StatusIcon({ className, isSuccess }) {
  return (
    <div className={`c-status-icon ${className}`}>
      {isSuccess ? <SuccessIcon /> : <FailedIcon />}
    </div>
  )
}

StatusIcon.defaultProps = {
  className: '',
  isSuccess: false
}

StatusIcon.propTypes = {
  className: PropTypes.string,
  isSuccess: PropTypes.bool
}

export default StatusIcon
