import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import SendIcon from '../../common/Icon/SendIcon/SendIcon'
import AttachmentIcon from '../../common/Icon/AttachmentIcon/AttachmentIcon'
import { chatMethod } from '../../../socket/hubHandlers'
import './NewMessage.scss'

function NewMessage({ className, channelId }) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const chatHub = useSelector((state) => state.signalR.chatHubConnection)
  const textareaRef = useRef(null)

  const sendMessageHandler = () => {
    if (channelId && message) {
      chatHub
        .invoke(chatMethod.sendMessage, {
          channelId,
          message: message.trim()
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setMessage('')
        })
    }
  }

  const onKeyDownHandler = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault()
      sendMessageHandler()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  const autoResize = () => {
    textareaRef.current.style.height = 'auto'
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
  }

  useEffect(() => {
    autoResize()
  }, [message])

  return (
    <div className={`c-new-message ${className}`}>
      <div className="attachments">
        <AttachmentIcon />
      </div>

      <div className={`message-input ${isFocused ? 'focused' : ''}`}>
        <textarea
          ref={textareaRef}
          rows={1}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={onKeyDownHandler}
          placeholder="Enter message"
          required
        />
      </div>

      <div className="send-btn" onClick={sendMessageHandler} role="presentation">
        <SendIcon />
      </div>
    </div>
  )
}

NewMessage.defaultProps = {
  className: '',
  channelId: null
}

NewMessage.propTypes = {
  className: PropTypes.string,
  channelId: PropTypes.number
}

export default NewMessage
