import { useParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import api from '../../../api/api'
import ChatHeader from '../../../components/chatPage/ChatHeader/ChatHeader'
import './Chat.scss'
import ChannelList from '../../../components/chatPage/ChannelList/ChannelsPanel'

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
    loadChannel(selectedChannelId)
  }, [selectedChannelId])

  return (
    <div className="p-chat">
      <ChannelList
        className="channels"
        selectedChannelId={+selectedChannelId}
        setSelectedChannelId={setSelectedChannelId}
      />

      <CSSTransition
        classNames="chat"
        in={!!selectedChannel}
        nodeRef={chatTransitionRef}
        timeout={300}
        unmountOnExit
      >
        <div ref={chatTransitionRef} className="chat">
          <div className="chat-header-container">
            <ChatHeader className="chat-header" channel={selectedChannel} />
          </div>
          <div className="chat-content">
            <div className="chat-messages">.</div>
            <div className="chat-input">.</div>
          </div>
        </div>
      </CSSTransition>
    </div>
  )
}

export default Chat
