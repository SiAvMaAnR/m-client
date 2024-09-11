import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { chatMethod } from '../../../../../socket/hubHandlers'
import ImageAttachment from './Image/ImageAttachment'
import { attachmentStatus } from '../../../../../constants/chat'
import './Attachment.scss'

function Attachment({ className = '', data = null, chatHub }) {
  const [attachment, setAttachment] = useState(null)
  const [status, setStatus] = useState(attachmentStatus.pending)

  useEffect(() => {
    if (chatHub) {
      setStatus(attachmentStatus.loading)

      chatHub
        .invoke(chatMethod.loadFile, {
          attachmentId: data.id
        })
        .then((result) => {
          if (!result?.content) {
            throw new Error('incorrect attachment')
          }

          setAttachment(result)
          setStatus(attachmentStatus.success)
        })
        .catch(() => {
          setStatus(attachmentStatus.error)
        })
    }
  }, [chatHub, data])

  return (
    <div className={`c-attachment ${className}`}>
      <ImageAttachment attachment={attachment} status={status} />
    </div>
  )
}

Attachment.propTypes = {
  className: PropTypes.string,
  data: PropTypes.shape({
    content: PropTypes.string,
    type: PropTypes.string
  }),
  chatHub: PropTypes.shape({
    invoke: PropTypes.func,
    on: PropTypes.func
  })
}

export default Attachment
