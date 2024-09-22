import PropTypes from 'prop-types'
import Loader2 from '../../../../../common/Loader/Loader2/Loader2'
import { attachmentStatus } from '../../../../../../constants/chat'
import './ImageAttachment.scss'

const imageStatusElementMapperFactory = (attachment) => ({
  [attachmentStatus.success]: (
    <img
      className="image"
      src={`data:${attachment?.type};base64, ${attachment?.content}`}
      alt="attachment"
    />
  ),
  [attachmentStatus.loading]: (
    <div className="image">
      <Loader2 className="image-loader" />
    </div>
  ),
  [attachmentStatus.error]: (
    <div className="image">
      <div className="error-status">Error</div>
    </div>
  )
})

function ImageAttachment({ className = '', attachment, status }) {
  const elementMapper = imageStatusElementMapperFactory(attachment)

  return <div className={`c-image-attachment ${className}`}>{elementMapper[status]}</div>
}

ImageAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string
  }),
  status: PropTypes.string
}

export default ImageAttachment
