import PropTypes from 'prop-types'
import { ArrowIcon } from '../../../common/Icon/_exports'
import './MessagesScrollToEnd.scss'

function MessagesScrollToEnd({ onClick = () => {}, className = '', isVisible = false }) {
  const visibleClass = isVisible ? 'visible' : ''

  const onClickHandler = (event) => {
    if (isVisible) {
      onClick(event)
    }
  }

  return (
    <div
      className={`c-messages-scroll ${className} ${visibleClass}`}
      onClick={onClickHandler}
      role="presentation"
    >
      <ArrowIcon className="arrow-icon" />
    </div>
  )
}

MessagesScrollToEnd.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  isVisible: PropTypes.bool
}

export default MessagesScrollToEnd
