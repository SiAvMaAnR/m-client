import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import './Attachment.scss'
import Loader2 from '../../../../common/Loader/Loader2/Loader2'

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
      {attachment?.content ? (
        <img
          className="image"
          src={`data:${attachment.type};base64, ${attachment.content}`}
          alt="attachment"
        />
      ) : (
        <div className="image">
          <Loader2 />
        </div>
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
