import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import signalR from '../socket/signalR'

const useSignalRHub = (hubName, callback) => {
  const isLogged = useSelector((state) => state.auth.info.isLogged)

  useEffect(() => {
    const connection = signalR[hubName]

    if (isLogged) {
      connection
        .start()
        .then(() => callback(connection))
        .catch((err) => console.error(err))
    }

    return () => connection.stop()
  }, [isLogged, hubName, callback])
}

export default useSignalRHub
