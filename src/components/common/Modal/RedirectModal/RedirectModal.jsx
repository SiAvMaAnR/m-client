import PropTypes from 'prop-types'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { BaseModal } from '../../../_exports'
import { page } from '../../../../constants/system'
import './RedirectModal.scss'

function RedirectModal({
  className = '',
  isActive = false,
  setIsActive = () => {},
  title = null,
  link = null,
  delay = null,
  message = null
}) {
  const navigate = useNavigate()
  const [timer, setTimer] = useState(delay)

  useEffect(() => {
    if (timer <= 0) {
      navigate(page.login)
    }
  }, [timer, navigate])

  useEffect(() => {
    let interval

    if (timer > 0 && isActive) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    }

    return () => clearInterval(interval)
  }, [timer, navigate, link, isActive])

  return (
    <div className="c-redirect-modal" role="presentation">
      <BaseModal
        className={`base-modal ${className}`}
        isActive={isActive}
        setIsActive={setIsActive}
      >
        <div className="redirect-modal-container">
          <div className="title">{title}</div>
          <div className="message">{message}</div>
          <div className="timer">{timer}</div>
        </div>
      </BaseModal>
    </div>
  )
}

RedirectModal.propTypes = {
  className: PropTypes.string,
  isActive: PropTypes.bool,
  setIsActive: PropTypes.func,
  title: PropTypes.string,
  link: PropTypes.string,
  delay: PropTypes.number,
  message: PropTypes.string
}

export default RedirectModal
