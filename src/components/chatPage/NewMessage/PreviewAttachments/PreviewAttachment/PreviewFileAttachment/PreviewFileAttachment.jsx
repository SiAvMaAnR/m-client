import PropTypes from 'prop-types'
import FileIcon from '../../../../../common/Icon/FileIcon/FileIcon'
import { formatBytes, getFileExtension } from '../../../../../../utils/helpers/commonHelper'
import './PreviewFileAttachment.scss'

function PreviewFileAttachment({ className = '', attachment }) {
  const { size, name } = attachment

  const fileExtension = getFileExtension(name)
  const formattedSize = formatBytes(size)

  return (
    <div className={`c-preview-file-attachment ${className}`}>
      <div className="preview-file">
        <FileIcon className="file-icon" />
        <div className="info">
          <div className="type">{fileExtension.toUpperCase()}</div>
          <div className="size">{formattedSize}</div>
        </div>
      </div>
    </div>
  )
}

PreviewFileAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    content: PropTypes.string
  })
}

export default PreviewFileAttachment
