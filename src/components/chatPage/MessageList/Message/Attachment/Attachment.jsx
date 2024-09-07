import PropTypes from 'prop-types'
import './Attachment.scss'

function Attachment({ className = '', data = null }) {
  const { content, type } = data


  // now only img
  return (
    <div className={`c-attachment ${className}`}>
      <img src={`data:${type};base64, ${content}`} alt="attachment" />
    </div>
  )
}

Attachment.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string
  })
}

export default Attachment
