import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import SendIcon from '../../common/Icon/SendIcon/SendIcon'
import AttachmentIcon from '../../common/Icon/AttachmentIcon/AttachmentIcon'
import { chatMethod } from '../../../socket/hubHandlers'
import DropDown from '../../common/DropDown/DropDown'
import SettingsIcon from '../../common/Sidebar/SidebarProfile/MenuIcons/SettingsIcon/SettingsIcon'
import ImgIcon from '../../common/Icon/ImgIcon/ImgIcon'
import FileInput from './FileInput/FileInput'
import './NewMessage.scss'

function NewMessage({ className, channelId }) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const fileInputRef = useRef(null)
  const [attachFiles, setAttachFiles] = useState([])
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

  const menuItems = [
    {
      icon: <ImgIcon />,
      title: 'Image',
      onClick: () => {
        fileInputRef.current.click()
      }
    },
    {
      icon: <SettingsIcon />,
      title: 'Settings',
      onClick: () => {}
    }
  ]

  const onChangeFile = (event) => {
    const { files } = event.target

    console.log(files)
  }

  return (
    <div className={`c-new-message ${className}`}>
      <FileInput fileInputRef={fileInputRef} onChangeFile={onChangeFile} />

      <DropDown className="dropdown-wrapper" items={menuItems}>
        <div className="attachments" onClick={() => {}} role="presentation">
          <AttachmentIcon />
        </div>
      </DropDown>

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
