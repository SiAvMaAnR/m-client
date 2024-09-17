import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import signalR from '../socket/signalR'

const useSignalRHub = (hubName, action) => {
  const dispatch = useDispatch()
  const isLogged = useSelector((state) => state.auth.info.isLogged)
  const connectionRef = useRef(signalR[hubName])
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    const connection = connectionRef.current

    if (isLogged) {
      connection
        .start()
        .then(() => {
          setIsConnected(true)
        })
        .catch(() => {
          setIsConnected(false)
        })
    }

    return () => {
      connection.stop()
      setIsConnected(false)
    }
  }, [isLogged, hubName])

  useEffect(() => {
    dispatch(
      action({
        connection: connectionRef.current,
        isConnected
      })
    )
  }, [dispatch, action, connectionRef, isConnected])
}

export default useSignalRHub
