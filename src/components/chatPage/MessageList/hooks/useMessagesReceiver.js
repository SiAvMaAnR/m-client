import { useEffect } from 'react'
import { chatMethod } from '../../../../socket/hubHandlers'

const useMessagesReceiver = ({
  setMessages,
  chatId,
  skipRef,
  messageListRef,
  scrollToEnd,
  chatHub
}) => {
  useEffect(() => {
    if (chatHub && chatHub.isConnected) {
      chatHub.connection.on(chatMethod.sendMessageRes, (data) => {
        const { channelId } = data

        chatHub.connection.invoke(chatMethod.channel, { channelId })

        if (channelId === chatId) {
          setMessages((messageList) => [data, ...messageList])

          skipRef.current += 1

          if (messageListRef.current.scrollTop > -800) {
            setTimeout(() => scrollToEnd(messageListRef.current, true), 100)
          }
        }
      })
    }

    return () => {
      if (chatHub) {
        chatHub.connection.off(chatMethod.sendMessageRes)
      }
    }
  }, [chatHub, chatId, setMessages, messageListRef, scrollToEnd, skipRef])
}

export default useMessagesReceiver
