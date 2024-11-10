import { useEffect, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import { BaseModal, Brand, FormButton, FormInput, SearchInput } from '../../../_exports'
import ValidIcon from '../../../common/Input/FormInput/ValidIcon/ValidIcon'
import { useDebounce } from '../../../../hooks/_exports'
import { channelType as chatType } from '../../../../constants/chat'
import CreateAIChannelStep1 from './FirstStep/CreateAIChannelStep1'
import CreateAIChannelStep2 from './SecondStep/CreateAIChannelStep2'
import api from '../../../../api/api'
import channelNameValidator from '../../../../utils/validators/channelNameValidator'
import Selector from '../../../common/Selector/Selector/Selector'
import './CreateAIChannelModal.scss'

const createChannelMapper = {
  [chatType.private]: api.channel.createPrivate,
  [chatType.public]: api.channel.createPublic,
  [chatType.direct]: api.channel.createDirect
}

const chatTypeSelectorItems = [
  {
    key: 0,
    value: chatType.private
  },
  {
    key: 1,
    value: chatType.public
  },
  {
    key: 2,
    value: chatType.direct
  }
]

function CreateAIChannelModal({
  className = '',
  isActive = false,
  setIsActive = () => {},
  onCreatedChannel = () => {}
}) {
  const [channelName, setChannelName] = useState('')
  const [channelType, setChannelType] = useState(chatType.public)
  const [errorMessage, setErrorMessage] = useState(null)
  const errorAnimationRef = useRef(null)
  const [isShowError, setIsShowError] = useState(false)
  const [itemsSearch, setItemsSearch] = useState('')
  const debouncedSearch = useDebounce(itemsSearch, 500)
  const [currentStep, setCurrentStep] = useState(0)
  const [isCreateChannelLoading, setIsCreateChannelLoading] = useState(false)
  const [selectedUserIds, setSelectedUserIds] = useState(new Set())
  const [profileId, setProfileId] = useState(null)

  const createChannelHandler = async () => {
    try {
      setIsCreateChannelLoading(true)

      if (createChannelMapper[channelType] === undefined) {
        throw new Error('Channel type is not correct')
      }

      channelNameValidator(channelName)

      const { data, response } = await createChannelMapper[channelType]({
        name: channelName.trim(),
        aiProfileId: profileId,
        members: [...selectedUserIds]
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
      }
    } catch (error) {
      setErrorMessage(error.message)
      setIsShowError(true)
    } finally {
      setIsCreateChannelLoading(false)
    }
  }

  const steps = [
    <CreateAIChannelStep1 debouncedSearch={debouncedSearch} setProfileId={setProfileId} />,
    <CreateAIChannelStep2 debouncedSearch={debouncedSearch} />
  ]

  const nextStepHandler = () => {
    if (channelType === chatType.direct || currentStep === 1) {
      createChannelHandler()
    } else if (profileId) {
      setCurrentStep((prevStep) => (prevStep < steps.length - 1 ? prevStep + 1 : prevStep))
    } else {
      setErrorMessage('Please select a profile')
      setIsShowError(true)
    }
  }

  const submitKeyDownHandler = (event) => {
    if (event.key === 'Enter' && !isCreateChannelLoading) {
      nextStepHandler()
    }
  }

  useEffect(() => {
    if (!isActive) {
      setChannelName('')
      setSelectedUserIds(new Set())
      setProfileId(null)
      setCurrentStep(0)
    }
  }, [isActive])

  return (
    <div className="c-create-ai-channel-modal" onKeyDown={submitKeyDownHandler} role="presentation">
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

            <div className="search">
              <SearchInput
                className="search-input"
                onChange={(e) => setItemsSearch(e.target.value)}
              />
            </div>
          </div>

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

          <div className="content">{steps[currentStep]}</div>

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

            <div className="channel-type-switcher">
              <Selector
                className="type-switcher"
                items={chatTypeSelectorItems}
                selectedValue={channelType}
                setSelectedValue={setChannelType}
              />
            </div>

            <div className="channel-continue-btn">
              <FormButton
                className="continue-btn"
                onClick={nextStepHandler}
                isLoading={isCreateChannelLoading}
              >
                Continue
              </FormButton>
            </div>
          </div>
        </>
      </BaseModal>
    </div>
  )
}

CreateAIChannelModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  onCreatedChannel: PropTypes.func
}

export default CreateAIChannelModal
