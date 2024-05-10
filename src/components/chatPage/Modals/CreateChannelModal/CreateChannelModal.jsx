import PropTypes from 'prop-types'
import BaseModal from '../../../common/Modal/BaseModal/BaseModal'
import './CreateChannelModal.scss'

function CreateChannelModal({ className, isActive, setIsActive }) {
  return (
    <div className="c-create-channel-modal">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <p>TEMP</p>
      </BaseModal>
    </div>
  )
}

CreateChannelModal.defaultProps = {
  className: '',
  isActive: false,
  setIsActive: () => {}
}

CreateChannelModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func
}

export default CreateChannelModal
