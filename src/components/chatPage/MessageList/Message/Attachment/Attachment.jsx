import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import './Attachment.scss'

function Attachment({ className = '', data = null }) {
  const chatHub = useSelector((state) => state.signalR.chatHubConnection)
  const [attachment, setAttachment] = useState(null)

  useEffect(() => {
    if (chatHub) {
      chatHub
        .invoke(chatMethod.loadFile, {
          attachmentId: data.id
        })
        .then((result) => {
          setAttachment(result)
        })
    }
  }, [chatHub, data])

  // now only img
  return (
    <div className={`c-attachment ${className}`}>
      {!!attachment?.content && (
        <img src={`data:${attachment.type};base64, ${attachment.content}`} alt="attachment" />
      )}
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
