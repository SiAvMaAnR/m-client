import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import SendIcon from '../../common/Icon/SendIcon/SendIcon'
import AttachmentIcon from '../../common/Icon/AttachmentIcon/AttachmentIcon'
import { chatMethod } from '../../../socket/hubHandlers'
import DropDown from '../../common/DropDown/DropDown'
import ImgIcon from '../../common/Icon/ImgIcon/ImgIcon'
import FileIcon from '../../common/Icon/FileIcon/FileIcon'
import FileInput from './FileInput/FileInput'
import Loader2 from '../../common/Loader/Loader2/Loader2'
import PreviewAttachments from './PreviewAttachments/PreviewAttachments'
import { encodeToBase64 } from '../../../utils/helpers/encodingHelper'
import './NewMessage.scss'

const maxSizeFiles = 10000000
const maxCountFiles = 8

async function adaptAttachments(attachments) {
  const adaptAttachmentsProm = attachments.map(async (attach) => ({
    content: await encodeToBase64(attach),
    type: attach.type
  }))

  const files = await Promise.all(adaptAttachmentsProm)

  return files
}

function isCorrectMessage(messageText, attachments) {
  return messageText || attachments?.length
}

function NewMessage({ className = '', channelId = null }) {
  const [message, setMessage] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isSending, setIsSending] = useState(false)
  const fileInputRef = useRef(null)
  const [attachFiles, setAttachFiles] = useState([])
  const chatHub = useSelector((state) => state.signalR.chatHubConnection)
  const textareaRef = useRef(null)

  const sendMessageHandler = async () => {
    if (channelId && isCorrectMessage(message, attachFiles)) {
      setIsSending(true)

      const adaptedAttachments = await adaptAttachments(attachFiles)

      chatHub
        .invoke(chatMethod.sendMessage, {
          channelId,
          message: message.trim(),
          attachments: adaptedAttachments
        })
        .then(() => {
          setAttachFiles([])
        })
        .catch((err) => {
          setErrorMessage(err.message)
        })
        .finally(() => {
          setMessage('')
          setIsSending(false)
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
        fileInputRef.current.accept = 'image/*'
        fileInputRef.current.click()
      }
    },
    {
      icon: <FileIcon />,
      title: 'File',
      onClick: () => {
        fileInputRef.current.accept = 'file/*'
        fileInputRef.current.click()
      }
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
      <div className="preview-attachments-wrapper">
        <PreviewAttachments className="preview-attachments" attachments={attachFiles} />
      </div>

      <div className="new-message-wrapper">
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
            readOnly={isSending}
          />
        </div>

        <div className="send-btn" onClick={sendMessageHandler} role="presentation">
          {isSending ? (
            <Loader2 className="send-btn-loader" />
          ) : (
            <SendIcon className="send-btn-icon" />
          )}
        </div>
      </div>
    </div>
  )
}

NewMessage.propTypes = {
  className: PropTypes.string,
  channelId: PropTypes.number
}

export default NewMessage
