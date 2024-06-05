import { useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import SendIcon from '../../common/Icon/SendIcon/SendIcon'
import { chatMethod } from '../../../socket/hubHandlers'
import './NewMessage.scss'

function NewMessage({ className, channelId }) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const chatHub = useSelector((state) => state.signalR.chatHubConnection)

  const sendMessageHandler = () => {
    if (channelId && message) {
      chatHub
        .invoke(chatMethod.sendMessage, {
          channelId,
          message
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setMessage('')
        })
    }
  }

  const sendMessageKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      sendMessageHandler()
    }
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
  }

  return (
    <div className={`c-new-message ${className}`}>
      <div className="attachments">{}</div>
      <div className={`message-input ${isFocused ? 'focused' : ''}`}>
        <input
          type="text"
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={(e) => setMessage(e.target.value)}
          value={message}
          onKeyDown={sendMessageKeyDownHandler}
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
