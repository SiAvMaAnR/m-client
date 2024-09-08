import PropTypes from 'prop-types'
import './FileInput.scss'

function FileInput({
  className = '',
  fileInputRef = null,
  fileType = null,
  onChangeFile = () => {}
}) {
  return (
    <div style={{ display: 'none' }} className={`c-file-input ${className}`}>
      <input type="file" ref={fileInputRef} accept={fileType} onChange={onChangeFile} multiple />
    </div>
  )
}

FileInput.propTypes = {
  className: PropTypes.string,
  fileInputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ]),
  fileType: PropTypes.string,
  onChangeFile: PropTypes.func
}

export default FileInput
