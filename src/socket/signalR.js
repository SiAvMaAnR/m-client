import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import { hub } from '../constants/system'
import config from '../config/configuration'
import { getAccessToken } from '../utils/helpers/tokenHelper'

const automaticReconnectIntervals = [0, 1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000]

const signalRConfig = {
  baseUrl: config.server.url,
  params: {
    accessTokenFactory: () => getAccessToken()
  }
}

function hubFactory(hubName) {
  return new HubConnectionBuilder()
    .withUrl(`${signalRConfig.baseUrl}/signalR/chat/${hubName}`, signalRConfig.params)
    .withAutomaticReconnect(automaticReconnectIntervals)
    .configureLogging(LogLevel.None)
    .build()
}

const signalRHub = {
  chat: hubFactory(hub.chat),
  state: hubFactory(hub.state)
}

export default signalRHub
