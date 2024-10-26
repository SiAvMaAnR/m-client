import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { BaseModal, Brand, FormButton, FormInput } from '../../../_exports'
import api from '../../../../api/api'
import GroupedSelector from '../../../common/Selector/GroupedSelector/GroupedSelector'
import { aiModelItems } from '../../../../constants/ai'
import './CreateAIProfileModal.scss'

function checkProfileData(profileInfo) {
  const { model, apiKey, template, temperature } = profileInfo

  return model && apiKey && template && temperature
}

function CreateAIProfileModal({ className = '', isActive = false, setIsActive, refreshProfiles }) {
  const [profileInfo, setProfileInfo] = useState({})
  const [isCreateProfileLoading, setIsCreateProfileLoading] = useState(false)
  console.log(profileInfo)

  const resetProfile = () => {
    setProfileInfo({})
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
            <GroupedSelector
              className="model-selector"
              placeholder="Select AI Model"
              items={aiModelItems}
              selectedValue={profileInfo.model}
              setSelectedValue={selectModelHandler}
            />
          </div>

          <div className="footer">
            <div className="profile-key-input">
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

            <div className="profile-create-btn">
              <FormButton
                className="create-btn"
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
