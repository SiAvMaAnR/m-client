import { useParams } from 'react-router-dom'
import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/api'
import CreateChannelIcon from '../../../components/chatPage/CreateChannelIcon/CreateChannelIcon'
import ChannelSearch from '../../../components/chatPage/ChannelSearch/ChannelSearch'
import Channel from '../../../components/chatPage/Channel/Channel'
import CreateChannelModal from '../../../components/chatPage/Modals/CreateChannelModal/CreateChannelModal'
import './Chat.scss'

const pageSize = 15

function Chat() {
  const { channelId } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(channelId)
  const [pageNumber, setPageNumber] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [isActiveCreateChannelModal, setIsActiveCreateChannelModal] = useState(false)


  const loadChannels = useCallback(async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.channel.accountChannels({
        pageNumber,
        pageSize
      })

      if (response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data) {
        throw new Error('Something went wrong')
      }

      setChannels(data.channels || [])
      setPagesCount(data.meta?.pagesCount || 0)
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber])

  useEffect(() => {
    loadChannels()
  }, [loadChannels])

  return (
    <div className="p-chat">
      <CreateChannelModal
        setIsActive={setIsActiveCreateChannelModal}
        isActive={isActiveCreateChannelModal}
      />

      <div className="channels">
        <div className="channels-header">
          <div className="header-search">
            <ChannelSearch className="channel-search" />
          </div>
          <div
            className="header-new-channel"
            onClick={() => setIsActiveCreateChannelModal(true)}
            role="presentation"
          >
            <CreateChannelIcon on className="new-channel-icon" />
          </div>
        </div>

        <div className="channels-filters">
          <div className="title">{}</div>
        </div>

        <div className="channels-list">
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              onClick={() => setSelectedChannel(channel.id)}
              isActive={selectedChannel === channel.id}
              data={channel}
            />
          ))}
        </div>
      </div>

      <div className="chat">
        <div className="chat-header">.</div>
        <div className="chat-content">
          <div className="chat-messages">.</div>
          <div className="chat-input">.</div>
        </div>
      </div>
    </div>
  )
}

export default Chat
