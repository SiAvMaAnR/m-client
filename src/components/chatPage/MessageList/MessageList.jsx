import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import moment from 'moment'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import api from '../../../api/api'
import { useDebounce, useKeyDown } from '../../../hooks/_exports'
import { chatMethod } from '../../../socket/hubHandlers'
import Loader1 from '../../common/Loader/Loader1/Loader1'
import MessageGroup from './MessageGroup/MessageGroup'
import groupMessages from './helpers/groupMessages'
import MessagesScrollToEnd from './MessagesScrollToEnd/MessagesScrollToEnd'
import './MessageList.scss'

const defaultPageSize = 30

function scrollToEnd(element, isSmooth) {
  element.scrollTo({
    top: 0,
    behavior: isSmooth ? 'smooth' : 'auto'
  })
}

function MessageList({ className = '', chatId = null }) {
  const [messages, setMessages] = useState([])
  const [groupedMessages, setGroupedMessages] = useState([])
  const [hasMore, setHasMore] = useState(true)
  const [isListLoading, setIsListLoading] = useState(false)
  const [isScrollLoading, setIsScrollLoading] = useState(false)
  const [searchMessage, setSearchMessage] = useState('')
  const [memberImages, setMemberImages] = useState([])
  const [isShowFastScroll, setIsShowFastScroll] = useState(false)
  const debouncedSearchMessage = useDebounce(searchMessage, 500)
  const skipRef = useRef(0)
  const pageNumberRef = useRef(0)
  const messageListRef = useRef()
  const observerRef = useRef()
  const messagesRef = useRef(messages)
  const [lastVisibleMessage, setLastVisibleMessage] = useState(null)
  const chatHub = useSelector((state) => state.signalR.chatHubConnection)
  const userId = useSelector((state) => state.auth.info.id)

  useEffect(() => {
    messagesRef.current = messages
  }, [messages])

  useEffect(() => {
    if (chatHub) {
      chatHub.on(chatMethod.sendMessageRes, (data) => {
        const { channelId } = data

        chatHub.invoke(chatMethod.channel, { channelId })

        if (channelId === chatId) {
          setMessages((messageList) => [data, ...messageList])

          skipRef.current += 1

          if (messageListRef.current.scrollTop > -800) {
            setTimeout(() => scrollToEnd(messageListRef.current, true), 100)
          }
        }
      })

      chatHub.on(chatMethod.readMessageRes, (data) => {
        setMessages((prevMessages) =>
          prevMessages.map((message) =>
            data.includes(message.id) ? { ...message, isRead: true } : message
          )
        )
      })
    }
    return () => {
      if (chatHub) {
        chatHub.off(chatMethod.sendMessageRes)
        chatHub.off(chatMethod.readMessageRes)
      }
    }
  }, [chatHub, chatId])

  useEffect(() => {
    const visibleMessage = messagesRef.current.find((message) => message.id === lastVisibleMessage)

    if (visibleMessage && !visibleMessage.isRead && +visibleMessage.authorId !== +userId) {
      chatHub.invoke(chatMethod.readMessage, {
        channelId: chatId,
        messageId: visibleMessage.id
      })
    }
  }, [chatHub, chatId, lastVisibleMessage, userId])

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0.1
    }

    observerRef.current = new IntersectionObserver((entries) => {
      const visibleMessageIds = entries
        .filter((entry) => entry.isIntersecting)
        .map((entry) => entry.target.getAttribute('data-id'))

      setLastVisibleMessage((lastVisible) => Math.max(...visibleMessageIds, lastVisible))
    }, options)

    return () => {
      observerRef.current.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!isListLoading && !isScrollLoading) {
      scrollToEnd(messageListRef.current)
      setLastVisibleMessage(null)
    }
  }, [chatId, isListLoading, isScrollLoading])

  useEffect(() => {
    api.channel.memberImages({ channelId: chatId }).then(({ data }) => {
      setMemberImages(data?.memberImages || [])
    })
  }, [chatId])

  const loadMessages = async ({ channelId, pageNumber, pageSize, skip, searchField }) => {
    if (!channelId) {
      return
    }

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

    const newMessages =
      data.messages.map((message) => ({
        ...message,
        pageNumber
      })) || []

    if (pageNumber === 0) {
      setMessages(newMessages)
    } else {
      setMessages((prevMessages) => [...prevMessages, ...newMessages])
    }

    setHasMore(pageNumberRef.current < data.meta.pagesCount - 1)
  }

  const refreshMessages = useCallback(
    async (search) => {
      pageNumberRef.current = 0
      skipRef.current = 0
      try {
        setIsListLoading(true)

        await loadMessages({
          channelId: chatId,
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: search,
          skip: skipRef.current
        })
      } finally {
        setIsListLoading(false)
      }
    },
    [chatId]
  )

  const onChangeMessageSearchHandler = (event) => {
    setSearchMessage(event.target.value)
  }

  useEffect(() => {
    refreshMessages(debouncedSearchMessage)
  }, [debouncedSearchMessage, refreshMessages])

  const fetchMoreMessages = async () => {
    if (!isScrollLoading) {
      pageNumberRef.current += 1

      try {
        setIsScrollLoading(true)

        await loadMessages({
          channelId: chatId,
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: debouncedSearchMessage,
          skip: skipRef.current
        })
      } finally {
        setIsScrollLoading(false)
      }
    }
  }

  useEffect(() => {
    const groupedMessageList = groupMessages(messages, memberImages)
    setGroupedMessages(groupedMessageList)
  }, [messages, memberImages])

  const onScrollHandler = () => {
    setIsShowFastScroll(messageListRef.current.scrollTop < -800)
  }

  useKeyDown(
    (event) => {
      event.preventDefault()
      if (event.ctrlKey) {
        scrollToEnd(messageListRef.current, true)
      }
    },
    ['Q', 'q']
  )

  return (
    <div className={`c-message-list ${className}`}>
      {isListLoading ? (
        <Loader1 className="loader" />
      ) : (
        <>
          <MessagesScrollToEnd
            className="messages-scroll"
            isVisible={isShowFastScroll}
            onClick={() => scrollToEnd(messageListRef.current, true)}
          />

          <div className="list" id="scrollableDiv" ref={messageListRef}>
            <InfiniteScroll
              className="infinity-scroll"
              dataLength={messages.length}
              next={fetchMoreMessages}
              hasMore={hasMore}
              loader={<Loader1 className="scroll-loader" />}
              scrollableTarget="scrollableDiv"
              onScroll={onScrollHandler}
              inverse
            >
              {groupedMessages.map((groupsInfo) => {
                const [groupDate, groups] = groupsInfo

                const date =
                  groupDate === moment(new Date()).format('DD.MM.YYYY') ? 'Today' : groupDate

                return (
                  <div key={groupDate} className="group-date">
                    {groups.map((group) => (
                      <MessageGroup key={group.id} group={group} observerRef={observerRef} />
                    ))}

                    <div className="messages-date-wrapper">
                      <div className="messages-date">{date}</div>
                    </div>
                  </div>
                )
              })}
            </InfiniteScroll>
          </div>
        </>
      )}
    </div>
  )
}

MessageList.propTypes = {
  className: PropTypes.string,
  chatId: PropTypes.number
}

export default MessageList
