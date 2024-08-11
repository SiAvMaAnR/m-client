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

const maxSizeFiles = 10000000
const maxCountFiles = 5

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
          message: message.trim(),
          attachFiles
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

  const getFilesSummary = (files) => {
    const size = files.reduce((acc, cur) => acc + cur.size, 0)
    const count = files.length

    return { size, count }
  }

  const onChangeFiles = (event) => {
    const { files } = event.target

    try {
      const { count, size } = getFilesSummary([...attachFiles, ...files])

      if (count > maxCountFiles) {
        throw new Error('Maximum number of attached files exceeded')
      }

      if (size > maxSizeFiles) {
        throw new Error('Maximum size of attached files exceeded')
      }

      const checkUniqFile = (file) =>
        attachFiles.every((currentFile) => currentFile.name !== file.name)

      Array.from(files)
        .filter((file) => checkUniqFile(file))
        .forEach((file) => setAttachFiles((prevFiles) => [...prevFiles, file]))
    } catch (err) {
      setErrorMessage(err.message)
    }
  }

  // temp
  useEffect(() => {
    console.log(attachFiles)
  }, [attachFiles])

  // temp
  useEffect(() => {
    console.log(errorMessage)
  }, [errorMessage])

  return (
    <div className={`c-new-message ${className}`}>
      <FileInput fileInputRef={fileInputRef} onChangeFile={onChangeFiles} />

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
