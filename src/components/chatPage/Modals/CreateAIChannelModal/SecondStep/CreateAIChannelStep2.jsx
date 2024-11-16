import { useCallback, useEffect, useRef, useState } from 'react'
import { CSSTransition } from 'react-transition-group'
import PropTypes from 'prop-types'
import Loader1 from '../../../../common/Loader/Loader1/Loader1'
import ValidIcon from '../../../../common/Input/FormInput/ValidIcon/ValidIcon'
import api from '../../../../../api/api'
import { useDebounce } from '../../../../../hooks/_exports'
import UserItem from '../../CreateChannelModal/UserItem/UserItem'
import './CreateAIChannelStep2.scss'

const defaultPageSize = 10

function CreateAIChannelStep2({ setIsActive }) {
  const [isUsersLoading, setIsUsersLoading] = useState(false)
  const [isShowError, setIsShowError] = useState(false)
  const errorAnimationRef = useRef(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [users, setUsers] = useState([])
  const pageNumberRef = useRef(0)
  const [pagesCount, setPagesCount] = useState(0)
  const [userSearch, setUserSearch] = useState('')
  const debouncedUserSearch = useDebounce(userSearch, 500)
  const [selectedUserIds, setSelectedUserIds] = useState(new Set())

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
    } catch (err) {
      // temp
    } finally {
      setIsUsersLoading(false)
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

  useEffect(() => {
    refreshUsers(debouncedUserSearch)
  }, [debouncedUserSearch, refreshUsers])

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

  return (
    <div className="c-create-ai-channel-step-2">
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

      <div className="users-wrapper" onScroll={scrollHandler}>
        {isUsersLoading ? (
          <Loader1 className="users-loader" />
        ) : (
          users.map((user) => (
            <UserItem
              className="user-item"
              key={user.id}
              userInfo={user}
              isChecked={selectedUserIds.has(user.id)}
              onToggle={toggleUserSelection}
              setIsActive={setIsActive}
            />
          ))
        )}
      </div>
    </div>
  )
}

CreateAIChannelStep2.propTypes = {
  setIsActive: PropTypes.func
}

export default CreateAIChannelStep2
