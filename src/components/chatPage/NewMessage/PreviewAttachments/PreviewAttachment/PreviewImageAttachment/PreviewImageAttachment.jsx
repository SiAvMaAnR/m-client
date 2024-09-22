import PropTypes from 'prop-types'
import './PreviewImageAttachment.scss'

function PreviewImageAttachment({ className = '', attachment }) {
  const { type, content } = attachment

  return (
    <div className={`c-preview-image-attachment ${className}`}>
      {content ? (
        <img className="preview-file" src={`data:${type};base64,${content}`} alt="attachment" />
      ) : (
        <div className="preview-file" />
      )}
    </div>
  )
}

PreviewImageAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    type: PropTypes.string,
    content: PropTypes.string
  })
}

export default PreviewImageAttachment
