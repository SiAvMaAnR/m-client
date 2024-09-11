import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'
import Attachment from './Attachment/Attachment'
import './Message.scss'

function Message({
  onClick = () => {},
  className = '',
  message = null,
  observerRef = null,
  chatHub
}) {
  const messageRef = useRef(null)

  const { id, text, attachments } = message

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
      {!!text && <div className="message-text">{text}</div>}

      {attachments.length > 0 && (
        <div className="message-attachments">
          {attachments?.map((attachment) => (
            <Attachment
              key={attachment.id}
              className="attachment"
              data={attachment}
              chatHub={chatHub}
            />
          ))}
        </div>
      )}
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
  }),
  chatHub: PropTypes.shape({
    invoke: PropTypes.func,
    on: PropTypes.func
  })
}

export default Message
