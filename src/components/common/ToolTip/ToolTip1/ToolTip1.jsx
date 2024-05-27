import { useRef, useState } from 'react'
import PropTypes from 'prop-types'
import './ToolTip1.scss'
import { CSSTransition } from 'react-transition-group'

function ToolTip1({ children, text, className }) {
  const refSetTimeout = useRef()
  const transitionRef = useRef(null)
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
      <CSSTransition
        classNames="tooltip"
        in={showToolTip}
        nodeRef={transitionRef}
        timeout={300}
        unmountOnExit
      >
        <div ref={transitionRef} className="tooltip">{text}</div>
      </CSSTransition>
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
