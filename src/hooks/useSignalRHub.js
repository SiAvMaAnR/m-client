import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import signalR from '../socket/signalR'

const useSignalRHub = (hubName) => {
  const isLogged = useSelector((state) => state.auth.info.isLogged)
  const connectionRef = useRef(signalR[hubName])

  useEffect(() => {
    const connection = connectionRef.current

    if (isLogged) {
      connection.start().catch((err) => console.log(err))
    }

    return () => {
      connection.stop()
    }
  }, [isLogged, hubName])

  return connectionRef.current
}

export default useSignalRHub
