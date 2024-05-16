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

const defaultPageSize = 15

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
  const pageNumberRef = useRef(0)

  const loadChannels = async ({ searchField, pageNumber, pageSize }) => {
    try {
      setIsLoading(true)
      console.log('updated')
      const { data, response } = await api.channel.accountChannels({
        searchField,
        pageNumber,
        pageSize
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      if (pageNumber === 0) {
        setChannels(data.channels || [])
      } else {
        setChannels((prevChannels) => [...prevChannels, ...(data.channels || [])])
      }

      setPagesCount(data.meta.pagesCount)
    } finally {
      setIsLoading(false)
    }
  }

  const resetPage = () => {
    console.log('resetPage')
    pageNumberRef.current = 0
  }

  const refreshChannels = useCallback((search) => {
    resetPage()

    loadChannels({
      pageNumber: pageNumberRef.current,
      pageSize: defaultPageSize,
      searchField: search
    })
  }, [])

  const onChangeChannelSearchHandler = (event) => {
    setSearchChannel(event.target.value)
  }

  useEffect(() => {
    console.log('use effect')
    refreshChannels(debouncedSearchChannel)
  }, [debouncedSearchChannel, refreshChannels])

  const scrollHandler = (event) => {
    if (!isLoading && pageNumberRef.current < pagesCount - 1) {
      const { scrollHeight, scrollTop } = event.target
      const targetHeight = event.target.getBoundingClientRect().height

      console.log(scrollHeight, scrollTop + targetHeight)

      const isNeedUpdate = scrollHeight - (scrollTop + targetHeight) < 50

      if (isNeedUpdate) {
        console.log('Page number changed')
        pageNumberRef.current += 1
        loadChannels({
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: debouncedSearchChannel
        })
      }
    }
  }

  return (
    <div className="p-chat">
      <CreateChannelModal
        setIsActive={setIsActiveCreateChannelModal}
        isActive={isActiveCreateChannelModal}
        onCreatedChannel={() => refreshChannels(debouncedSearchChannel)}
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
