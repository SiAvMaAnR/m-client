import { useEffect, useState } from 'react'
import './Profile.scss'
import api from '../../../api/api'

function Profile() {
  const [email, setEmail] = useState('')
  const [login, setLogin] = useState('')
  const [image, setImage] = useState('')

  useEffect(() => {
    api.account.profile().then((result) => {
      setEmail(result?.data?.email ?? 'none')
      setLogin(result?.data?.login ?? 'none')
    })
  }, [])

  useEffect(() => {
    api.account.image().then((result) => {
      setImage(result?.data?.image)
    })
  }, [])

  return (
    <div className="p-profile">
      <div className="profile-content">
        <div className="image">{image}</div>
        <div className="login">{login}</div>
        <div className="email">{email}</div>
      </div>
    </div>
  )
}

export default Profile
