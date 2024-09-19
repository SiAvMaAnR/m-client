import PropTypes from 'prop-types'
import Loader2 from '../../../../../common/Loader/Loader2/Loader2'
import FileIcon from '../../../../../common/Icon/FileIcon/FileIcon'
import RemoveIcon from '../../../../../common/Icon/RemoveIcon/RemoveIcon'
import { attachmentStatus } from '../../../../../../constants/chat'
import { formatBytes, getFileExtension } from '../../../../../../utils/helpers/commonHelper'
import './FileAttachment.scss'

const fileStatusElementMapper = {
  [attachmentStatus.success]: <FileIcon className="file-icon file-downloader-icon" />,
  [attachmentStatus.loading]: <Loader2 className="file-icon file-loader-icon" />,
  [attachmentStatus.error]: <RemoveIcon className="file-icon file-error-icon" />
}

function FileAttachment({ className = '', attachment, status }) {
  const { name, content, type, size } = attachment

  const fileExtension = getFileExtension(name)
  const formattedSize = formatBytes(size)

  return (
    <div className={`c-file-attachment ${className}`}>
      <div className="file-attachment-content">
        <div className="file-downloader-container">
          <a
            className="download-file-icon-container"
            href={`data:${type};base64, ${content}`}
            download={name}
            aria-label={`Download ${name}`}
          >
            {fileStatusElementMapper[status]}
          </a>
        </div>
        <div className="file-info-container">
          <div className="file-name">{name || 'None'}</div>
          <div className="file-info">
            <div className="file-extension">{fileExtension.toUpperCase() || 'NONE'}</div>
            <div className="file-size">{formattedSize}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

FileAttachment.propTypes = {
  className: PropTypes.string,
  attachment: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    size: PropTypes.number
  }),
  status: PropTypes.string
}

export default FileAttachment
