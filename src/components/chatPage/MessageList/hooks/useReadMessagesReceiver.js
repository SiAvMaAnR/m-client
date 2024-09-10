import { useEffect } from 'react'
import { chatMethod } from '../../../../socket/hubHandlers'

const useReadMessagesReceiver = ({ setMessages, chatHub }) => {
  useEffect(() => {
    if (chatHub) {
      chatHub.on(chatMethod.readMessageRes, (data) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            data.includes(message.id) ? { ...message, isRead: true } : message
          )
        )
      })
    }
    return () => {
      if (chatHub) {
        chatHub.off(chatMethod.readMessageRes)
      }
    }
  }, [chatHub, setMessages])
}

export default useReadMessagesReceiver
