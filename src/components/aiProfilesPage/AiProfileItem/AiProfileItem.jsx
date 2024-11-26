import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import DropDown from '../../common/DropDown/DropDown'
import config from '../../../config/configuration'
import ImgWrapper from '../../common/ImgWrapper/ImgWrapper'
import api from '../../../api/api'
import { CreateIcon, EditIcon, RemoveIcon, ToolsIcon } from '../../common/Icon/_exports'
import { page } from '../../../constants/system'
import './AiProfileItem.scss'

function AiProfileItem({ className = '', profileInfo = null, refreshProfiles, openUpdateModal }) {
  const navigate = useNavigate()
  const { id, integration, model, name, template, temperature, apiKey } = profileInfo

  const imageSrc = `${config.app.publicPath}/defaultImages/ai-integrations/${integration}.png`

  const createDirect = async () => {
    const { data } = await api.channel.createDirect({
      name,
      aiProfileId: id
    })

    if (data.isSuccess && data.channelId) {
      navigate(`${page.chat}/${data.channelId}`)
    }
  }

  const dropDownItems = [
    {
      icon: <CreateIcon className="dropdown-icon" />,
      title: 'Direct',
      onClick: () => {
        createDirect()
      }
    },
    {
      icon: <EditIcon className="dropdown-icon" />,
      title: 'Edit',
      onClick: () => {
        openUpdateModal(profileInfo)
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
      <td id="id">#{id}</td>
      <td id="name">{name}</td>
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
  openUpdateModal: PropTypes.func,
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
