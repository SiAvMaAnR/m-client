import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BaseModal, Brand, FormButton, FormInput } from '../../../_exports'
import api from '../../../../api/api'
import GroupedSelector from '../../../common/Selector/GroupedSelector/GroupedSelector'
import { aiModel, aiModelItems } from '../../../../constants/ai'
import TextArea from '../../../common/TextArea/TextArea'
import './CreateAIProfileModal.scss'

function checkProfileData(profileInfo) {
  const { name, model, apiKey, temperature } = profileInfo

  return name && model && apiKey && temperature
}

const defaultProfileData = {
  model: aiModel.gpt3T
}

function CreateAIProfileModal({ className = '', isActive = false, setIsActive, refreshProfiles }) {
  const [profileInfo, setProfileInfo] = useState(defaultProfileData)
  const [isCreateProfileLoading, setIsCreateProfileLoading] = useState(false)

  const resetProfile = () => {
    setProfileInfo(defaultProfileData)
  }

  const selectModelHandler = (model) => {
    setProfileInfo((profile) => ({ ...profile, model }))
  }

  const createProfileHandler = async () => {
    const isCorrect = checkProfileData(profileInfo)

    if (isCorrect) {
      setIsCreateProfileLoading(true)

      await api.aiProfile
        .create(profileInfo)
        .then(() => {
          refreshProfiles()
          setIsActive(false)
        })
        .finally(() => {
          resetProfile()
          setIsCreateProfileLoading(false)
        })
    }
  }

  const submitKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      createProfileHandler()
    }
  }

  useEffect(() => {
    resetProfile()
  }, [isActive])

  return (
    <div className="c-create-ai-profile-modal" onKeyDown={submitKeyDownHandler} role="presentation">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <>
          <div className="header">
            <div className="brand">
              <Brand className="brand">M|7|R</Brand>
            </div>
          </div>

          <div className="content">
            <div className="first-row">
              <div className="name-input">
                <FormInput
                  className="form-input"
                  type="text"
                  placeholder="Name"
                  onChange={(event) =>
                    setProfileInfo((prevProfile) => ({
                      ...prevProfile,
                      name: event.target.value
                    }))
                  }
                  value={profileInfo.name}
                  pattern=".*"
                  required
                />
              </div>

              <div className="model-selector">
                <GroupedSelector
                  className="selector"
                  placeholder="Select AI Model"
                  items={aiModelItems}
                  selectedValue={profileInfo.model}
                  setSelectedValue={selectModelHandler}
                />
              </div>

              <div className="temperature-input">
                <FormInput
                  className="form-input"
                  type="number"
                  placeholder="Temperature"
                  onChange={(event) =>
                    setProfileInfo((prevProfile) => ({
                      ...prevProfile,
                      temperature: event.target.value
                    }))
                  }
                  value={profileInfo.temperature}
                  pattern=".*"
                  min="0"
                  max="1"
                  step="0.1"
                  required
                />
              </div>
            </div>

            <div className="second-row">
              <div className="template-input">
                <TextArea
                  className="textarea"
                  placeholder="Enter template"
                  value={profileInfo.template}
                  onChange={(event) =>
                    setProfileInfo((prevProfile) => ({
                      ...prevProfile,
                      template: event.target.value
                    }))
                  }
                />
              </div>
            </div>
          </div>

          <div className="footer">
            <div className="key-input">
              <FormInput
                className="form-input"
                type="text"
                placeholder="Enter api-key"
                onChange={(event) =>
                  setProfileInfo((prevProfile) => ({
                    ...prevProfile,
                    apiKey: event.target.value
                  }))
                }
                value={profileInfo.apiKey}
                pattern=".*"
                required
              />
            </div>

            <div className="create-btn">
              <FormButton
                className="form-btn"
                onClick={createProfileHandler}
                isLoading={isCreateProfileLoading}
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

CreateAIProfileModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  refreshProfiles: PropTypes.func
}

export default CreateAIProfileModal
