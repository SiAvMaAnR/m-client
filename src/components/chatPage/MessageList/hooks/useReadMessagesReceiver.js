import { useEffect } from 'react'
import { chatMethod } from '../../../../socket/hubHandlers'

const useReadMessagesReceiver = ({ setMessages, chatHub }) => {
  useEffect(() => {
    if (chatHub && chatHub.isConnected) {
      chatHub.connection.on(chatMethod.readMessageRes, (data) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            data.includes(message.id) ? { ...message, isRead: true } : message
          )
        )
      })
    }
    return () => {
      if (chatHub) {
        chatHub.connection.off(chatMethod.readMessageRes)
      }
    }
  }, [chatHub, setMessages])
}

export default useReadMessagesReceiver
