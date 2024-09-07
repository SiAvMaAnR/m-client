import PropTypes from 'prop-types'
import Attachment from './PreviewAttachment/PreviewAttachment'
import './PreviewAttachments.scss'

function PreviewAttachments({ className = '', attachments = [] }) {
  return (
    <div className={`c-preview-attachments ${className}`}>
      {attachments.map((attachment) => (
        <Attachment key={attachment.name} className="attachment" data={attachment} />
      ))}
    </div>
  )
}

PreviewAttachments.propTypes = {
  className: PropTypes.string,
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      size: PropTypes.number,
      type: PropTypes.string
    })
  )
}

export default PreviewAttachments
