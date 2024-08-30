import { channelType } from '../../constants/chat'

const defaultImageMapper = {
  [channelType.direct]: 'direct-channel',
  [channelType.public]: 'public-channel',
  [channelType.private]: 'private-channel'
}

export default defaultImageMapper
