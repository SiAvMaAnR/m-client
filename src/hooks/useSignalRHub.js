import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import signalR from '../socket/signalR'

const useSignalRHub = (hubName) => {
  const isLogged = useSelector((state) => state.auth.info.isLogged)

  const connection = signalR[hubName]

  useEffect(() => {
    if (isLogged) {
      connection.start()
    }

    return () => connection.stop()
  }, [connection, isLogged])

  return connection
}

export default useSignalRHub
