import PropTypes from 'prop-types'
import { channelType } from '../../../../../constants/chat'
import './ChannelTypeSwitcher.scss'

function ChannelTypeSwitcher({ className = '', chatType, setChatType }) {
  const onClickHandler = () => {
    setChatType((prevType) =>
      prevType === channelType.public ? channelType.private : channelType.public
    )
  }

  return (
    <div
      className={`c-channel-type-switcher ${className}`}
      onClick={onClickHandler}
      role="presentation"
    >
      {chatType === channelType.public ? <p>Public</p> : <p>Private</p>}
    </div>
  )
}

ChannelTypeSwitcher.propTypes = {
  className: PropTypes.string,
  chatType: PropTypes.string,
  setChatType: PropTypes.func
}

export default ChannelTypeSwitcher
