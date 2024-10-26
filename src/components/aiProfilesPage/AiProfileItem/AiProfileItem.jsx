import PropTypes from 'prop-types'
import DropDown from '../../common/DropDown/DropDown'
import config from '../../../config/configuration'
import ImgWrapper from '../../common/ImgWrapper/ImgWrapper'
import ToolsIcon from '../../common/Icon/ToolsIcon/ToolsIcon'
import RemoveIcon from '../../common/Icon/RemoveIcon/RemoveIcon'
import EditIcon from '../../common/Icon/EditIcon/EditIcon'
import api from '../../../api/api'
import './AiProfileItem.scss'

function AiProfileItem({ className = '', profileInfo = null, refreshProfiles }) {
  const { id, integration, model, template, temperature, apiKey } = profileInfo

  const imageSrc = `${config.app.publicPath}/defaultImages/ai-integrations/${integration}.png`

  const dropDownItems = [
    {
      icon: <EditIcon className="dropdown-icon" />,
      title: 'Edit',
      onClick: () => {
        refreshProfiles()
      }
    },
    {
      icon: <RemoveIcon className="dropdown-icon" />,
      title: 'Remove',
      onClick: () => {
        api.aiProfile.delete({ id }).then(() => {
          refreshProfiles()
        })
      }
    }
  ]

  return (
    <tr className={`c-ai-profile-item ${className}`}>
      <td id="image">
        <ImgWrapper src={imageSrc} alt="profile-img" />
      </td>
      <td id="id">{id}</td>
      <td id="integration">{integration}</td>
      <td id="model">{model.toLowerCase()}</td>
      <td id="template">{template}</td>
      <td id="temperature">{temperature}</td>
      <td id="apiKey">{apiKey ? '+' : '-'}</td>
      <td id="tools">
        <DropDown items={dropDownItems} className="bottom">
          <ToolsIcon className="tools-icon" aria-label="tools" />
        </DropDown>
      </td>
    </tr>
  )
}

AiProfileItem.propTypes = {
  className: PropTypes.string,
  refreshProfiles: PropTypes.func,
  profileInfo: PropTypes.shape({
    id: PropTypes.number,
    integration: PropTypes.string,
    model: PropTypes.string,
    template: PropTypes.string,
    temperature: PropTypes.number,
    apiKey: PropTypes.string
  })
}

export default AiProfileItem
