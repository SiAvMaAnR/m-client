import PropTypes from 'prop-types'
import { BaseModal, Brand } from '../../../_exports'
import './CreateAIChannelModal.scss'

function CreateAIChannelModal({
  className = '',
  isActive = false,
  setIsActive = () => {},
  onCreatedChannel = () => {}
}) {
  const submitKeyDownHandler = (event) => {
    if (event.key === 'Enter') {
      // temp
    }
  }

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
          </div>

          <div>.</div>
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
