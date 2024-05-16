import { useNavigate, useParams } from 'react-router-dom'
import { useCallback, useEffect, useRef, useState } from 'react'
import api from '../../../api/api'
import CreateChannelIcon from '../../../components/chatPage/CreateChannelIcon/CreateChannelIcon'
import ChannelSearch from '../../../components/chatPage/ChannelSearch/ChannelSearch'
import Channel from '../../../components/chatPage/Channel/Channel'
import CreateChannelModal from '../../../components/chatPage/Modals/CreateChannelModal/CreateChannelModal'
import { page } from '../../../constants/system'
import { useDebounce } from '../../../hooks/_exports'
import './Chat.scss'

const pageSize = 15

function Chat() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [isLoading, setIsLoading] = useState(false)
  const [channels, setChannels] = useState([])
  const [selectedChannel, setSelectedChannel] = useState(id)
  const [searchChannel, setSearchChannel] = useState('')
  const debouncedSearchChannel = useDebounce(searchChannel, 500)
  const [isActiveCreateChannelModal, setIsActiveCreateChannelModal] = useState(false)
  const [pagesCount, setPagesCount] = useState(0)
  const pageNumber = useRef(0)

  const loadChannels = useCallback(async () => {
    try {
      setIsLoading(true)
      console.log('updated')
      const { data, response } = await api.channel.accountChannels({
        searchField: debouncedSearchChannel,
        pageNumber: pageNumber.current,
        pageSize
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }
      
      if (pageNumber.current === 0) {
        setChannels(data.channels || [])
      } else {
        setChannels((prevChannels) => [...prevChannels, ...(data.channels || [])])
      }

      setPagesCount(data.meta.pagesCount)
    } finally {
      setIsLoading(false)
    }
  }, [debouncedSearchChannel])

  const refreshChannels = useCallback(() => {
    // зачищается сразу
    pageNumber.current = 0
    loadChannels()

    // может остаться прошлым
    // мб pagenumber is useRef?
  }, [loadChannels])

  useEffect(() => {
    refreshChannels()
  }, [debouncedSearchChannel, refreshChannels])

  const onChangeChannelSearchHandler = (event) => {
    setSearchChannel(event.target.value)
  }

  useEffect(() => {
    console.log('use effect')
    loadChannels()
  }, [loadChannels])

  const scrollHandler = (event) => {
    if (!isLoading && pageNumber.current < pagesCount) {
      const { scrollHeight, scrollTop } = event.target
      const targetHeight = event.target.getBoundingClientRect().height

      console.log(scrollHeight, scrollTop + targetHeight)

      const isNeedUpdate = scrollHeight - (scrollTop + targetHeight) < 50

      if (isNeedUpdate) {
        console.log('Page number changed')
        pageNumber.current += 1
        loadChannels()
      }
    }
  }

  return (
    <div className="p-chat">
      <CreateChannelModal
        setIsActive={setIsActiveCreateChannelModal}
        isActive={isActiveCreateChannelModal}
        onCreatedChannel={refreshChannels}
      />

      <div className="channels">
        <div className="channels-header">
          <div className="header-search">
            <ChannelSearch className="channel-search" onChange={onChangeChannelSearchHandler} />
          </div>
          <div
            className="header-new-channel"
            onClick={() => setIsActiveCreateChannelModal(true)}
            role="presentation"
          >
            <CreateChannelIcon className="new-channel-icon" />
          </div>
        </div>

        <div className="channels-filters">
          <div className="title">{}</div>
        </div>

        <div className="channels-list" onScroll={scrollHandler}>
          {channels.map((channel) => (
            <Channel
              key={channel.id}
              onClick={() => {
                setSelectedChannel(channel.id)
                navigate(`${page.chat}/${channel.id}`)
              }}
              isActive={+selectedChannel === channel.id}
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
