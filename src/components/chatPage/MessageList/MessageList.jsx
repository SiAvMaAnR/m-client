import PropTypes from 'prop-types'
import { CSSTransition, TransitionGroup } from 'react-transition-group'
import { createRef, useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../../api/api'
import { useDebounce } from '../../../hooks/_exports'
import Message from './Message/Message'
import { chatMethod } from '../../../socket/hubHandlers'
import './MessageList.scss'

const defaultPageSize = 25

function MessageList({ className, chatId }) {
  const [messages, setMessages] = useState([])
  const [pagesCount, setPagesCount] = useState(0)
  const [isLoading, setIsLoading] = useState(false)
  const [searchMessage, setSearchMessage] = useState('')
  const debouncedSearchMessage = useDebounce(searchMessage, 500)
  const skipRef = useRef(0)
  const pageNumberRef = useRef(0)
  const messageListRef = useRef()
  const chatHub = useSelector((state) => state.signalR.chatHubConnection)

  useEffect(() => {
    chatHub.on(chatMethod.sendMessageRes, (data) => {
      setMessages((messageList) => [data, ...messageList])

      const { channelId } = data

      skipRef.current += 1

      messageListRef.current.scrollTo({
        top: 0,
        behavior: 'smooth'
      })

      chatHub.invoke(chatMethod.channel, { channelId })
    })

    return () => {
      chatHub.off(chatMethod.sendMessageRes)
    }
  }, [chatHub])

  const loadMessages = async ({ channelId, pageNumber, pageSize, skip, searchField }) => {
    try {
      setIsLoading(true)
      const { data, response } = await api.chat.messages({
        channelId,
        pageNumber,
        pageSize,
        skip,
        searchField
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      if (pageNumber === 0) {
        setMessages(data.messages || [])
      } else {
        setMessages((prevMessages) => [...prevMessages, ...(data.messages || [])])
      }

      setPagesCount(data.meta.pagesCount)
    } finally {
      setIsLoading(false)
    }
  }

  const refreshMessages = useCallback(
    (search, isSmoothScroll) => {
      const scrollBehavior = isSmoothScroll ? 'smooth' : 'auto'

      pageNumberRef.current = 0
      skipRef.current = 0

      messageListRef.current.scrollTo({
        top: 0,
        behavior: scrollBehavior
      })

      loadMessages({
        channelId: chatId,
        pageNumber: pageNumberRef.current,
        pageSize: defaultPageSize,
        searchField: search,
        skip: skipRef.current
      })
    },
    [chatId]
  )

  const onChangeMessageSearchHandler = (event) => {
    setSearchMessage(event.target.value)
  }

  useEffect(() => {
    refreshMessages(debouncedSearchMessage)
  }, [debouncedSearchMessage, refreshMessages])

  const scrollHandler = (event) => {
    if (!isLoading && pageNumberRef.current < pagesCount - 1) {
      const { scrollHeight, scrollTop } = event.target
      const targetHeight = event.target.getBoundingClientRect().height

      const isNeedUpdate = scrollHeight - (scrollTop + targetHeight) < 100

      if (isNeedUpdate) {
        pageNumberRef.current += 1
        loadMessages({
          channelId: chatId,
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: debouncedSearchMessage,
          skip: skipRef.current
        })
      }
    }
  }

  return (
    <div className={`c-message-list ${className}`}>
      <div className="list" onScroll={scrollHandler} ref={messageListRef}>
        <TransitionGroup component={null}>
          {messages.map((message) => {
            const nodeRef = createRef()
            return (
              <CSSTransition key={message.id} nodeRef={nodeRef} timeout={100} classNames="message">
                <div ref={nodeRef}>
                  <Message key={message.id} onClick={() => {}} data={message} />
                </div>
              </CSSTransition>
            )
          })}
        </TransitionGroup>
      </div>
    </div>
  )
}

MessageList.defaultProps = {
  className: '',
  chatId: null
}

MessageList.propTypes = {
  className: PropTypes.string,
  chatId: PropTypes.number
}

export default MessageList
