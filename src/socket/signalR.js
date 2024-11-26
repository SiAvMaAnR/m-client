import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { hub } from '../constants/system'
import config from '../config/configuration'
import { getAccessToken } from '../utils/helpers/tokenHelper'

const reconnectInterval = 1000

const signalRConfig = {
  baseUrl: config.server.url,
  params: {
    accessTokenFactory: () => getAccessToken()
  }
}

function hubFactory(hubName) {
  return new HubConnectionBuilder()
    .withUrl(`${signalRConfig.baseUrl}/signalR/chat/${hubName}`, signalRConfig.params)
    .withAutomaticReconnect({ nextRetryDelayInMilliseconds: () => reconnectInterval })
    .configureLogging(LogLevel.None)
    .build()
}

const signalRHub = {
  chat: hubFactory(hub.chat),
  state: hubFactory(hub.state)
}

export default signalRHub
