import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import config from '../../../config/configuration'
import FormButton from '../../../components/common/Button/FormButton/FormButton'
import UploadIcon from '../../../components/common/Icon/UploadIcon/UploadIcon'
import api from '../../../api/api'
import FileInput from '../../../components/chatPage/NewMessage/FileInput/FileInput'
import { encodeToBase64 } from '../../../utils/helpers/encodingHelper'
import { updateInfo } from '../../../redux/slices/userSlice'
import './Profile.scss'
import Loader1 from '../../../components/common/Loader/Loader1/Loader1'

function Profile() {
  const { login, email, image, birthday } = useSelector((state) => state.user.info)
  const dispatch = useDispatch()
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  const imageSrc = image
    ? `data:image/jpeg;base64, ${image}`
    : `${config.app.publicPath}/defaultImages/user-profile.jpg`

  const uploadImageHandler = async (event) => {
    const [file] = event.target.files
    const imgBase64 = await encodeToBase64(file).then((result) => result.split(',')[1])

    setIsLoading(true)

    api.account
      .uploadImage({ image: imgBase64 })
      .then((result) => {
        dispatch(updateInfo({ image: result.data?.image }))
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  return (
    <div className="p-profile">
      <div className="profile-content">
        <div className="image">
          {isLoading ? (
            <Loader1 className="img-loader" />
          ) : (
            <>
              <FileInput
                fileType="image/*"
                fileInputRef={fileInputRef}
                onChangeFile={uploadImageHandler}
              />

              <div
                className="update-container"
                onClick={() => fileInputRef.current.click()}
                role="presentation"
              >
                <UploadIcon className="update-icon" />
              </div>

              <img src={imageSrc} alt="profile-img" />
            </>
          )}
        </div>

        <div className="main-info">
          <div className="login">
            <p>{login}</p>
          </div>
          <div className="email">
            <p>{email}</p>
          </div>
        </div>

        <div className="additional-info">
          <div className="birthday">
            <p>{birthday || 'null'}</p>
          </div>
        </div>

        <FormButton className="edit-btn">Edit profile</FormButton>
      </div>
    </div>
  )
}

export default Profile
