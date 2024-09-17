import PropTypes from 'prop-types'
import FileIcon from '../../../../../common/Icon/FileIcon/FileIcon'
import './PreviewFileAttachment.scss'

function getFileExtension(filename) {
  return filename.split('.').pop()
}

function formatBytes(bytes) {
  let result

  if (bytes < 1024) {
    result = `${bytes} B`
  } else if (bytes < 1024 * 1024) {
    result = `${(bytes / 1024).toFixed(1)} KB`
  } else if (bytes < 1024 * 1024 * 1024) {
    result = `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  } else {
    result = `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`
  }

  return result
}

function PreviewFileAttachment({ className = '', attachment }) {
  const { size, name } = attachment

  const fileExtension = getFileExtension(name)
  const formattedSize= formatBytes(size)

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
