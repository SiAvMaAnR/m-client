import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import api from '../../../api/api'
import ChatHeader from '../../../components/chatPage/ChatHeader/ChatHeader'
import ChannelList from '../../../components/chatPage/ChannelList/ChannelList'
import MessageList from '../../../components/chatPage/MessageList/MessageList'
import NewMessage from '../../../components/chatPage/NewMessage/NewMessage'
import './Chat.scss'

function Chat() {
  const { id } = useParams()
  const [selectedChannelId, setSelectedChannelId] = useState(id)
  const [selectedChannel, setSelectedChannel] = useState(null)
  const chatTransitionRef = useRef()
  
  const loadChannel = async (channelId) => {
    const result = await api.channel.accountChannel({ id: channelId })

    setSelectedChannel(result.data)
  }

  useEffect(() => {
    if (selectedChannelId) {
      loadChannel(selectedChannelId)
    } else {
      setSelectedChannel(null)
    }
  }, [selectedChannelId])

  useEffect(() => {
    setSelectedChannelId(id)
  }, [id])

  return (
    <div className="p-chat">
      <ChannelList
        className="channels"
        selectedChannelId={+selectedChannelId}
        setSelectedChannelId={setSelectedChannelId}
      />

      <div className="chat-wrapper">
        <CSSTransition
          classNames="chat"
          in={!!selectedChannel}
          nodeRef={chatTransitionRef}
          timeout={100}
          unmountOnExit
        >
          <div ref={chatTransitionRef} className="chat">
            <div className="chat-header-container">
              <ChatHeader className="chat-header" channel={selectedChannel} />
            </div>
            <div className="chat-content">
              <div className="chat-messages">
                <MessageList chatId={+selectedChannelId} />
              </div>
              <div className="chat-input">
                <NewMessage channelId={+selectedChannelId} />
              </div>
            </div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}

export default Chat
