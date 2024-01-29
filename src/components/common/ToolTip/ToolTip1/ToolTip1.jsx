import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './ToolTip1.scss'

function ToolTip1({ children, text, className }) {
  const refSetTimeout = useRef()
  const [showToolTip, setShowToolTip] = useState(false)

  const onMouseEnterHandler = () => {
    refSetTimeout.current = setTimeout(() => {
      setShowToolTip(true)
    }, 750)
  }

  const onMouseLeaveHandler = () => {
    clearTimeout(refSetTimeout.current)
    setShowToolTip(false)
  }

  return (
    <div
      className={`c-tooltip ${className}`}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      {children}
      {showToolTip && <div className="tooltip">{text}</div>}
    </div>
  )
}

ToolTip1.defaultProps = {
  children: null,
  text: '',
  className: ''
}

ToolTip1.propTypes = {
  children: PropTypes.element,
  text: PropTypes.string,
  className: PropTypes.string
}

export default ToolTip1
