import PropTypes from 'prop-types'
import './PreviewAttachment.scss'

function PreviewAttachment({ className = '', data }) {
  const attachmentSrc = URL.createObjectURL(data)

  return (
    <div className={`c-preview-attachment ${className}`}>
      <img src={attachmentSrc} alt="attachment" />
    </div>
  )
}

PreviewAttachment.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string
  })
}

export default PreviewAttachment
