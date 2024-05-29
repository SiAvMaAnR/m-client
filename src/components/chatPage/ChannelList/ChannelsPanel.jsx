import { useCallback, useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { useNavigate } from 'react-router-dom'
import Channel from '../Channel/Channel'
import ChannelFilter from '../ChannelFilter/ChannelFilter'
import CreateChannelIcon from '../CreateChannelIcon/CreateChannelIcon'
import { ToolTip1 } from '../../_exports'
import ChannelSearch from '../ChannelSearch/ChannelSearch'
import api from '../../../api/api'
import CreateChannelModal from '../Modals/CreateChannelModal/CreateChannelModal'
import { useDebounce } from '../../../hooks/_exports'
import { page } from '../../../constants/system'
import './ChannelsPanel.scss'

const defaultPageSize = 15

function ChannelsPanel({ className, selectedChannelId, setSelectedChannelId }) {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [channels, setChannels] = useState([])
  const [pagesCount, setPagesCount] = useState(0)
  const [searchChannel, setSearchChannel] = useState('')
  const debouncedSearchChannel = useDebounce(searchChannel, 500)
  const [isActiveCreateChannelModal, setIsActiveCreateChannelModal] = useState(false)
  const [activeChannelType, setActiveChannelCount] = useState(null)
  const pageNumberRef = useRef(0)
  const channelListRef = useRef()

  const loadChannels = async ({ searchField, pageNumber, pageSize, type }) => {
    try {
      setIsLoading(true)
      const { data, response } = await api.channel.accountChannels({
        searchField,
        pageNumber,
        pageSize,
        channelType: type
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
    pageNumberRef.current = 0
  }

  const refreshChannels = useCallback(
    (search, isSmoothScroll) => {
      const scrollBehavior = isSmoothScroll ? 'smooth' : 'auto'

      resetPage()

      channelListRef.current.scrollTo({
        top: 0,
        behavior: scrollBehavior
      })

      loadChannels({
        pageNumber: pageNumberRef.current,
        pageSize: defaultPageSize,
        searchField: search,
        type: activeChannelType
      })
    },
    [activeChannelType]
  )

  const onChangeChannelSearchHandler = (event) => {
    setSearchChannel(event.target.value)
  }

  useEffect(() => {
    refreshChannels(debouncedSearchChannel)
  }, [debouncedSearchChannel, refreshChannels])

  const scrollHandler = (event) => {
    if (!isLoading && pageNumberRef.current < pagesCount - 1) {
      const { scrollHeight, scrollTop } = event.target
      const targetHeight = event.target.getBoundingClientRect().height

      const isNeedUpdate = scrollHeight - (scrollTop + targetHeight) < 100

      if (isNeedUpdate) {
        pageNumberRef.current += 1
        loadChannels({
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: debouncedSearchChannel,
          type: activeChannelType
        })
      }
    }
  }

  const onCreatedChannelHandler = () => {
    refreshChannels(debouncedSearchChannel, true)
  }

  return (
    <div className={`c-channels-panel ${className}`}>
      <CreateChannelModal
        setIsActive={setIsActiveCreateChannelModal}
        isActive={isActiveCreateChannelModal}
        onCreatedChannel={onCreatedChannelHandler}
      />

      <div className="channels-header">
        <div className="header-search">
          <ChannelSearch className="channel-search" onChange={onChangeChannelSearchHandler} />
        </div>
        <div className="header-new-channel">
          <ToolTip1 text="Create new channel">
            <CreateChannelIcon
              onClick={() => setIsActiveCreateChannelModal(true)}
              className="new-channel-icon"
            />
          </ToolTip1>
        </div>
      </div>

      <div className="channels-filters">
        <ChannelFilter
          className="filter"
          setType={setActiveChannelCount}
          type={activeChannelType}
        />
      </div>

      <div className="channels-list" onScroll={scrollHandler} ref={channelListRef}>
        {channels.map((channel) => (
          <Channel
            key={channel.id}
            onClick={() => {
              setSelectedChannelId(channel.id)
              navigate(`${page.chat}/${channel.id}`)
            }}
            isActive={+selectedChannelId === channel.id}
            data={channel}
          />
        ))}
      </div>
    </div>
  )
}

ChannelsPanel.defaultProps = {
  className: '',
  selectedChannelId: null,
  setSelectedChannelId: () => {}
}

ChannelsPanel.propTypes = {
  className: PropTypes.string,
  selectedChannelId: PropTypes.number,
  setSelectedChannelId: PropTypes.func
}

export default ChannelsPanel
