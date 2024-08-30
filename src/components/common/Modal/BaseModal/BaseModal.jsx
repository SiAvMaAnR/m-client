import { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import './BaseModal.scss'

function BaseModal({ className = '', isActive = false, setIsActive = () => {}, children = null }) {
  const modalRef = useRef(null)
  const modalAnimationRef = useRef(null)

  useEffect(() => {
    modalRef.current?.focus()
  }, [modalRef])

  function closeHandler() {
    setIsActive(false)
  }

  const keyDownHandler = (event) => {
    switch (event.key) {
      case 'Escape':
        closeHandler()
        break
      default:
        break
    }
  }

  const clickHandler = (event) => {
    if (!modalRef.current.contains(event.target)) {
      closeHandler()
    }
  }

  return (
    <div className="c-base-modal">
      <CSSTransition
        classNames="modal"
        in={isActive}
        nodeRef={modalAnimationRef}
        timeout={300}
        unmountOnExit
      >
        <div
          ref={modalAnimationRef}
          className="modal"
          onKeyDown={keyDownHandler}
          onClick={clickHandler}
          role="presentation"
        >
          <div ref={modalRef} className={`modal-content ${className}`}>
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

BaseModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  children: PropTypes.element
}

export default BaseModal
