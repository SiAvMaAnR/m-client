import PropTypes from 'prop-types'
import { channelType } from '../../../../constants/chat'
import './ChannelFilter.scss'

const filtersInfo = [
  {
    key: 1,
    title: 'All',
    type: null
  },
  {
    key: 2,
    title: 'Public',
    type: channelType.public
  },
  {
    key: 3,
    title: 'Private',
    type: channelType.private
  },
  {
    key: 4,
    title: 'Direct',
    type: channelType.direct
  }
]

function ChannelFilter({ className, setType, type }) {
  return (
    <div className={`c-channel-filter ${className}`}>
      {filtersInfo.map((info) => (
        <div
          key={info.key}
          className={`filter ${info.type === type ? 'selected' : ''}`}
          onClick={() => setType(info.type)}
          role="presentation"
        >
          <div className="title">{info.title}</div>
        </div>
      ))}
    </div>
  )
}

ChannelFilter.defaultProps = {
  className: '',
  setType: () => {},
  type: null
}

ChannelFilter.propTypes = {
  className: PropTypes.string,
  setType: PropTypes.func,
  type: PropTypes.string
}

export default ChannelFilter
