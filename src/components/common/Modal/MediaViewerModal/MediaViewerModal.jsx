import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BaseModal } from '../../../_exports'
import ArrowIcon from '../../Icon/ArrowIcon/ArrowIcon'
import { chatMethod } from '../../../../socket/hubHandlers'
import Loader2 from '../../Loader/Loader2/Loader2'
import './MediaViewerModal.scss'

function MediaViewerModal({
  className = '',
  isActive = false,
  setIsActive = () => {},
  attachmentIds = [],
  defaultActiveAttachmentId
}) {
  const chatHub = useSelector((state) => state.signalR.chatHub)
  const [attachmentIndex, setAttachmentIndex] = useState(0)
  const [attachments, setAttachments] = useState([])

  const currentAttachment = attachments[attachmentIndex]

  useEffect(() => {
    setAttachments([])
  }, [isActive])

  useEffect(() => {
    const index = attachmentIds.indexOf(defaultActiveAttachmentId)

    setAttachmentIndex(index)
  }, [defaultActiveAttachmentId, attachmentIds])

  useEffect(() => {
    if (isActive) {
      attachmentIds.forEach((attachmentId) => {
        chatHub.connection
          .invoke(chatMethod.loadFile, { attachmentId })
          .then((attachment) => {
            setAttachments((prevAttachments) =>
              [...prevAttachments, attachment].sort((prev, next) => prev.id - next.id)
            )
          })
          .catch(() => {})
      })
    }
  }, [chatHub, attachmentIds, isActive])

  const prevItemHandler = async () => {
    setAttachmentIndex((prev) => (prev > 0 ? prev - 1 : prev))
  }

  const nextItemHandler = async () => {
    setAttachmentIndex((prev) => (prev < attachments.length - 1 ? prev + 1 : prev))
  }

  return (
    <div className="c-media-viewer-modal" role="presentation">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <div className="media-viewer">
          <div className="prev-item">
            <ArrowIcon onClick={prevItemHandler} className="arrow-icon" />
          </div>

          <div className="viewer-content">
            {currentAttachment ? (
              <img
                className="image"
                src={`data:${currentAttachment.type};base64, ${currentAttachment.content}`}
                alt="attachment"
              />
            ) : (
              <Loader2 className='media-loader'/>
            )}
          </div>

          <div className="next-item">
            <ArrowIcon onClick={nextItemHandler} className="arrow-icon" />
          </div>
        </div>
      </BaseModal>
    </div>
  )
}

MediaViewerModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  attachmentIds: PropTypes.arrayOf(PropTypes.number),
  defaultActiveAttachmentId: PropTypes.number
}

export default MediaViewerModal
