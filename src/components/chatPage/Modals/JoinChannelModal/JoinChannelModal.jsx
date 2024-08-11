import PropTypes from 'prop-types'
import { BaseModal } from '../../../_exports'
import './JoinChannelModal.scss'

function JoinChannelModal({ className, isActive, setIsActive }) {
  return (
    <div className="c-join-channel-modal" role="presentation">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <>
          <div>XEXE</div>
          <div>ХАХА</div>
        </>
      </BaseModal>
    </div>
  )
}

JoinChannelModal.defaultProps = {
  className: '',
  isActive: false,
  setIsActive: () => {}
}

JoinChannelModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func
}

export default JoinChannelModal
