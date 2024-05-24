import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import { SearchInput, FormInput, BaseModal, Brand, FormButton } from '../../../_exports'
import { channelType as chatType } from '../../../../constants/chat'
import api from '../../../../api/api'
import UserItem from './UserItem/UserItem'
import { useDebounce } from '../../../../hooks/_exports'
import ValidIcon from '../../../common/Input/FormInput/ValidIcon/ValidIcon'
import './CreateChannelModal.scss'

const defaultPageSize = 10

const createChannelMapper = {
  [chatType.private]: api.channel.createPrivate,
  [chatType.public]: api.channel.createPublic
}

function CreateChannelModal({ className, isActive, setIsActive, onCreatedChannel }) {
  const [channelName, setChannelName] = useState('')
  const [channelType, setChannelType] = useState(chatType.public)
  const [userSearch, setUserSearch] = useState('')
  const debouncedUserSearch = useDebounce(userSearch, 500)
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [isCreateChannelLoading, setIsCreateChannelLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [pagesCount, setPagesCount] = useState(0)
  const [selectedUserIds, setSelectedUserIds] = useState(new Set())
  const [isShowError, setIsShowError] = useState(false)
  const pageNumberRef = useRef(0)
  const errorAnimationRef = useRef(null)

  const createChannelHandler = async () => {
    try {
      setIsCreateChannelLoading(true)

      if (createChannelMapper[channelType] === undefined) {
        throw new Error('Channel type is not correct')
      }

      const { data, response } = await createChannelMapper[channelType]({
        name: channelName,
        members: [...selectedUserIds]
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      if (data.isSuccess) {
        setIsActive(false)
        onCreatedChannel()
        setChannelName('')
      }
    } catch (error) {
      setErrorMessage(error.message)
      setIsShowError(true)
    } finally {
      setIsCreateChannelLoading(false)
    }
  }

  const loadUsers = async ({ searchField, pageNumber, pageSize }) => {
    try {
      setIsUsersLoading(true)

      const { data, response } = await api.account.accounts({
        pageNumber,
        pageSize,
        searchField,
        isLoadImage: true
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      if (pageNumber === 0) {
        setUsers(data.accounts || [])
      } else {
        setUsers((prevAccounts) => [...prevAccounts, ...(data.accounts || [])])
      }

      setPagesCount(data.meta.pagesCount)
    } finally {
      setIsUsersLoading(false)
    }
  }

  const resetPage = () => {
    pageNumberRef.current = 0
  }

  const refreshUsers = useCallback((search) => {
    resetPage()

    loadUsers({
      pageNumber: pageNumberRef.current,
      pageSize: defaultPageSize,
      searchField: search
    })
  }, [])

  const onChangeUserSearchHandler = (event) => {
    setUserSearch(event.target.value)
  }

  useEffect(() => {
    refreshUsers(debouncedUserSearch)
  }, [debouncedUserSearch, refreshUsers])

  const submitKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      createChannelHandler()
    }
  }

  const scrollHandler = (event) => {
    if (!isUsersLoading && pageNumberRef.current < pagesCount - 1) {
      const { scrollHeight, scrollTop } = event.target
      const targetHeight = event.target.getBoundingClientRect().height

      const isNeedUpdate = scrollHeight - (scrollTop + targetHeight) < 100

      if (isNeedUpdate) {
        pageNumberRef.current += 1
        loadUsers({
          pageNumber: pageNumberRef.current,
          pageSize: defaultPageSize,
          searchField: debouncedUserSearch
        })
      }
    }
  }

  const toggleUserSelection = (userId) => {
    setSelectedUserIds((prevSelectedUserIds) => {
      const newSelectedUserIds = new Set(prevSelectedUserIds)
      if (newSelectedUserIds.has(userId)) {
        newSelectedUserIds.delete(userId)
      } else {
        newSelectedUserIds.add(userId)
      }
      return newSelectedUserIds
    })
  }

  const onChangeNameHandler = (event) => {
    setChannelName(event.target.value)
  }

  return (
    <div className="c-create-channel-modal" onKeyDown={submitKeyDownHandler} role="presentation">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <>
          <div className="header">
            <div className="brand">
              <Brand className="brand">Safe|Book</Brand>
            </div>

            <div className="search">
              <SearchInput className="user-search" onChange={onChangeUserSearchHandler} />
            </div>
          </div>

          <CSSTransition
            classNames="message"
            in={isShowError}
            nodeRef={errorAnimationRef}
            timeout={300}
            unmountOnExit
            onEntered={() =>
              setTimeout(() => {
                setIsShowError(false)
              }, 2000)
            }
            onExited={() => setErrorMessage(null)}
          >
            <div className="message" ref={errorAnimationRef}>
              <ValidIcon className="valid-icon" />
              <p>{errorMessage}</p>
            </div>
          </CSSTransition>

          <div className="content" onScroll={scrollHandler}>
            {users.map((user) => (
              <UserItem
                className="user-item"
                key={user.id}
                userInfo={user}
                isChecked={selectedUserIds.has(user.id)}
                onToggle={toggleUserSelection}
              />
            ))}
          </div>

          <div className="footer">
            <div className="channel-name-input">
              <FormInput
                className="form-input"
                type="text"
                placeholder="Enter name"
                onChange={onChangeNameHandler}
                value={channelName}
                pattern=".*"
                required
              />
            </div>

            <div className="channel-create-btn">
              <FormButton
                className="create-btn"
                onClick={createChannelHandler}
                isLoading={isCreateChannelLoading}
              >
                Create
              </FormButton>
            </div>
          </div>
        </>
      </BaseModal>
    </div>
  )
}

CreateChannelModal.defaultProps = {
  className: '',
  isActive: false,
  setIsActive: () => {},
  onCreatedChannel: () => {}
}

CreateChannelModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  onCreatedChannel: PropTypes.func
}

export default CreateChannelModal
