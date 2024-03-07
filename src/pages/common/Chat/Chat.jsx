import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/api'
import './Chat.scss'

const pageSize = 15

function Chat() {
  const [isLoading, setIsLoading] = useState(false)
  const [channels, setChannels] = useState([])
  const [pageNumber, setPageNumber] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)

  const loadChannels = useCallback(async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.chat.channels({
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
      <div className="channels">
        <div className="channels-header">
          <div className="header-menu">.</div>
          <div className="header-search">.</div>
          <div className="header-new-channel">.</div>
        </div>
        <div className="channels-list">.</div>
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
