import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import './Message.scss'

function Message({ onClick = () => {}, className = '', message = null, observerRef = null }) {
  const messageRef = useRef(null)
  const { id, text } = message

  useEffect(() => {
    const currentObserver = observerRef.current
    const currentMessage = messageRef.current

    if (currentMessage && currentObserver) {
      currentObserver.observe(currentMessage)
    }

    return () => {
      if (currentMessage && currentObserver) {
        currentObserver.unobserve(currentMessage)
      }
    }
  }, [observerRef])

  return (
    <div
      ref={messageRef}
      data-id={id}
      className={`c-message ${className}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="message-text">{text}</div>
    </div>
  )
}

Message.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
  message: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string
  }),
  observerRef: PropTypes.shape({
    current: PropTypes.instanceOf(IntersectionObserver)
  })
}

export default Message
