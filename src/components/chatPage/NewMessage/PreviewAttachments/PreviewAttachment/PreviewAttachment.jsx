import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useCallback, useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import Loader1 from '../../../../common/Loader/Loader1/Loader1'
import './PreviewAttachment.scss'

function PreviewAttachment({ className = '', attachment, setAttachFiles }) {
  const isUploaded = attachment.id !== undefined
  const [isLoaded, setIsLoaded] = useState(false)
  const [adaptedAttachment, setAdaptedAttachment] = useState(attachment)
  const chatHub = useSelector((state) => state.signalR.chatHub)

  const removeFile = useCallback(
    (attachmentUId) => {
      chatHub.connection
        .invoke(chatMethod.removeFile, { uniqueId: attachmentUId })
        .then(() => {
          setAttachFiles((files) => files.filter((file) => file.uniqueId !== attachmentUId))
        })
        .catch()
    },
    [chatHub, setAttachFiles]
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

  const { type, content } = adaptedAttachment

  return (
    <div className={`c-preview-attachment ${className}`}>
      {!isLoaded && <Loader1 className="img-loader" />}

      {content ? (
        <img className="preview-file" src={`data:${type};base64,${content}`} alt="attachment" />
      ) : (
        <div className="preview-file" />
      )}
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
