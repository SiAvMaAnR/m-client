import PropTypes from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import Attachment from './Attachment/Attachment'
import MediaViewerModal from '../../../common/Modal/MediaViewerModal/MediaViewerModal'
import { isImageAttachmentType } from '../../../../utils/helpers/attachmentTypeHelper'
import './Message.scss'

const getMediaAttachmentIds = (attachments) =>
  attachments
    .filter((attachment) => isImageAttachmentType(attachment.type))
    .map((attachment) => attachment.id)

function Message({ onClick = () => {}, className = '', message = null, observerRef = null }) {
  const messageRef = useRef(null)
  const [isActiveMediaViewer, setIsActiveMediaViewer] = useState(false)
  const [defaultIdMediaViewer, setDefaultIdMediaViewer] = useState(null)

  const { id, text, attachments } = message

  const mediaAttachmentIds = getMediaAttachmentIds(attachments)

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
    <>
      <MediaViewerModal
        isActive={isActiveMediaViewer}
        setIsActive={setIsActiveMediaViewer}
        attachmentIds={mediaAttachmentIds}
        defaultActiveAttachmentId={defaultIdMediaViewer}
      />

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
                onClick={() => {
                  if (isImageAttachmentType(attachment.type)) {
                    setIsActiveMediaViewer((active) => !active)
                    setDefaultIdMediaViewer(attachment.id)
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </>
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
