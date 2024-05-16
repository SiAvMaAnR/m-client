import PropTypes from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import { SearchInput, FormInput, BaseModal, Brand, FormButton } from '../../../_exports'
import { channelType as chatType } from '../../../../constants/chat'
import api from '../../../../api/api'
import UserItem from './UserItem/UserItem'
import { useDebounce } from '../../../../hooks/_exports'
import './CreateChannelModal.scss'

const pageSize = 15

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
  const [pageNumber, setPageNumber] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [errorMessage, setErrorMessage] = useState(null)

  const createChannelHandler = async () => {
    try {
      setIsCreateChannelLoading(true)

      if (createChannelMapper[channelType] === undefined) {
        throw new Error('Channel type is not correct')
      }

      const { data, response } = await createChannelMapper[channelType]({
        name: channelName
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
    } finally {
      setIsCreateChannelLoading(false)
    }
  }

  const loadUsers = useCallback(async () => {
    try {
      setIsUsersLoading(true)

      const { data, response } = await api.account.accounts({
        pageNumber,
        pageSize,
        isLoadImage: true,
        searchField: debouncedUserSearch
      })

      if (response?.data?.clientMessage) {
        throw new Error(response.data.clientMessage)
      }

      if (!data || response?.data?.errors) {
        throw new Error('Something went wrong')
      }

      setUsers(data.accounts || [])
      setPagesCount(data.meta?.pagesCount || 0)
    } finally {
      setIsUsersLoading(false)
    }
  }, [pageNumber, debouncedUserSearch])

  const submitKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      createChannelHandler()
    }
  }

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

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
              <SearchInput
                className="user-search"
                onChange={(e) => setUserSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="content">
            {users.map((user) => (
              <UserItem className="user-item" key={user.id} userInfo={user} />
            ))}
          </div>

          <div className="footer">
            <div className="channel-name-input">
              <FormInput
                className="form-input"
                type="text"
                placeholder="Enter name"
                onChange={(e) => setChannelName(e.target.value)}
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
