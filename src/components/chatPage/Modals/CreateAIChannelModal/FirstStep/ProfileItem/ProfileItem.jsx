import PropTypes from 'prop-types'
import config from '../../../../../../config/configuration'
import ImgWrapper from '../../../../../common/ImgWrapper/ImgWrapper'
import './ProfileItem.scss'

function ProfileItem({ className, profileInfo = null, onClick, isSelected = false }) {
  const { id, name, integration, model } = profileInfo

  const imageSrc = `${config.app.publicPath}/defaultImages/ai-integrations/${integration}.png`
  const selectedClassName = isSelected ? 'selected' : ''

  return (
    <div
      className={`c-profile-item ${className} ${selectedClassName}`}
      onClick={onClick}
      role="presentation"
    >
      <div className="image">
        <ImgWrapper src={imageSrc} alt="profile-img" />
      </div>

      <div className="profile-info">
        <div className="id">#{id}</div>

        <div className="name">{name}</div>

        <div className="model">{model.toLowerCase()}</div>
      </div>

      <div className="options">-</div>
    </div>
  )
}

ProfileItem.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  profileInfo: PropTypes.shape({
    id: PropTypes.number,
    integration: PropTypes.string,
    model: PropTypes.string
  }),
  isSelected: PropTypes.bool
}

export default ProfileItem
