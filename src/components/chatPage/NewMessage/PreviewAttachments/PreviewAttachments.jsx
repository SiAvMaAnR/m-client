import PropTypes from 'prop-types'
import Attachment from './PreviewAttachment/PreviewAttachment'
import './PreviewAttachments.scss'

function PreviewAttachments({ className = '', attachments = [], setAttachFiles }) {
  return (
    <div className={`c-preview-attachments ${className}`}>
      {attachments.map((attachment) => (
        <Attachment
          key={attachment.uniqueId}
          className="attachment"
          attachment={attachment}
          setAttachFiles={setAttachFiles}
        />
      ))}
    </div>
  )
}

PreviewAttachments.propTypes = {
  className: PropTypes.string,
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.string,
      uniqueId: PropTypes.string
    })
  ),
  setAttachFiles: PropTypes.func
}

export default PreviewAttachments
