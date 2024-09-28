import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import FileAttachment from './File/FileAttachment'
import ImageAttachment from './Image/ImageAttachment'
import { attachmentStatus } from '../../../../../constants/chat'
import './Attachment.scss'

const attachmentTypeMapper = (attachment, status) => {
  let component = null

  if (/^image\/.*/.test(attachment.type)) {
    component = <ImageAttachment attachment={attachment} status={status} />
  } else if (/^(application|text)\/.*/.test(attachment.type)) {
    component = <FileAttachment attachment={attachment} status={status} />
  }

  return component
}
function Attachment({ className = '', data = null, onClick }) {
  const [attachment, setAttachment] = useState(data)
  const [status, setStatus] = useState(attachmentStatus.pending)
  const chatHub = useSelector((state) => state.signalR.chatHub)

  useEffect(() => {
    if (chatHub && chatHub.isConnected) {
      setStatus(attachmentStatus.loading)

      chatHub.connection
        .invoke(chatMethod.loadFile, {
          attachmentId: data.id
        })
        .then((result) => {
          setAttachment(result)
          setStatus(attachmentStatus.success)
        })
        .catch(() => {
          setStatus(attachmentStatus.error)
        })
    }
  }, [chatHub, data])

  return (
    <div className={`c-attachment ${className}`} onClick={onClick} role="presentation">
      {attachmentTypeMapper(attachment, status)}
    </div>
  )
}

Attachment.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string
  }),
  onClick: PropTypes.func
}

export default Attachment
