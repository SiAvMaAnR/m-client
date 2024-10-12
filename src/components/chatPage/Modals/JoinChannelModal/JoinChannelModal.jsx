import PropTypes from 'prop-types'
import { BaseModal, Brand } from '../../../_exports'
import './JoinChannelModal.scss'

function JoinChannelModal({ className = '', isActive = false, setIsActive = () => {} }) {
  return (
    <div className="c-join-channel-modal" role="presentation">
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

JoinChannelModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func
}

export default JoinChannelModal
