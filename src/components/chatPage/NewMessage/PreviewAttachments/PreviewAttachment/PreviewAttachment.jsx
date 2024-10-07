import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import Loader1 from '../../../../common/Loader/Loader1/Loader1'
import PreviewImageAttachment from './PreviewImageAttachment/PreviewImageAttachment'
import PreviewFileAttachment from './PreviewFileAttachment/PreviewFileAttachment'
import RemoveIcon from '../../../../common/Icon/RemoveIcon/RemoveIcon'
import {
  isFileAttachmentType,
  isImageAttachmentType
} from '../../../../../utils/helpers/attachmentTypeHelper'
import './PreviewAttachment.scss'

const attachmentTypeMapper = (attachment) => {
  let component = null

  if (isImageAttachmentType(attachment.type)) {
    component = <PreviewImageAttachment className="preview-attachment" attachment={attachment} />
  } else if (isFileAttachmentType(attachment.type)) {
    component = <PreviewFileAttachment className="preview-attachment" attachment={attachment} />
  }

  return component
}

function PreviewAttachment({ className = '', attachment, setAttachFiles }) {
  const isUploaded = attachment.id !== undefined
  const [isLoaded, setIsLoaded] = useState(false)
  const [adaptedAttachment, setAdaptedAttachment] = useState(attachment)
  const chatHub = useSelector((state) => state.signalR.chatHub)

  const removeFile = useCallback(
    (attachmentUId) => {
      if (isLoaded) {
        chatHub.connection
          .invoke(chatMethod.removeFile, { uniqueId: attachmentUId })
          .then(() => {
            setAttachFiles((files) => files.filter((file) => file.uniqueId !== attachmentUId))
          })
          .catch()
      }
    },
    [chatHub, setAttachFiles, isLoaded]
  )

  useEffect(() => {
    if (isUploaded) {
      chatHub.connection
        .invoke(chatMethod.loadFile, { attachmentId: attachment.id })
        .then((result) => {
          setAdaptedAttachment((prevAttachment) => ({
            ...prevAttachment,
            content: result.content
          }))
          setIsLoaded(true)
        })
        .catch(() => setIsLoaded(false))
    } else {
      chatHub.connection
        .invoke(chatMethod.uploadFile, attachment)
        .then(() => setIsLoaded(true))
        .catch(() => setIsLoaded(false))
    }
  }, [chatHub, attachment, isUploaded])

  return (
    <div className={`c-preview-attachment ${className}`}>
      {!isLoaded && <Loader1 className="img-loader" />}

      <div
        className="remove-container"
        onClick={() => removeFile(attachment.uniqueId)}
        role="presentation"
      >
        <RemoveIcon className="remove-icon" />
      </div>

      {attachmentTypeMapper(adaptedAttachment)}
    </div>
  )
}

PreviewAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    id: PropTypes.number,
    content: PropTypes.string,
    uniqueId: PropTypes.string,
    type: PropTypes.string,
    isLoaded: PropTypes.bool
  }),
  setAttachFiles: PropTypes.func
}

export default PreviewAttachment
