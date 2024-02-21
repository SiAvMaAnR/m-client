import { useCallback, useEffect, useState } from 'react'
import api from '../../../api/api'
import { UserItem, PageHeader, Pagination } from '../../../components/_exports'
import './Users.scss'

const pageSize = 10

function Users() {
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [users, setUsers] = useState([])
  const [pageNumber, setPageNumber] = useState(0)

  const loadUsers = useCallback(async () => {
    try {
      setIsLoading(true)

      const { data, response } = await api.admin.users({
        pageNumber,
        pageSize,
        isLoadImage: true
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

      setUsers(data.users || [])
    } catch (error) {
      setMessage(error.message)
    } finally {
      setIsLoading(false)
    }
  }, [pageNumber])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  return (
    <div className="p-users">
      <PageHeader className="users-header" text="Users" />

      <div className="users-content">
        {users.map((user) => (
          <UserItem key={user.id} userInfo={user} />
        ))}
      </div>

      <Pagination className="users-pagination" />
    </div>
  )
}

export default Users
