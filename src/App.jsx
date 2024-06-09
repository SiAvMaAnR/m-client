import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useRefreshToken from './hooks/useRefreshToken'
import useSignalRHub from './hooks/useSignalRHub'
import { hub } from './constants/system'
import { setChatConnection, setStateConnection } from './redux/slices/signalRSlice'
import './App.scss'

function App() {
  const theme = useSelector((state) => state.system.theme)
  const dispatch = useDispatch()

  useRefreshToken()
  const stateConnection = useSignalRHub(hub.state)
  const chatConnection = useSignalRHub(hub.chat)

  useEffect(() => {
    dispatch(setChatConnection(chatConnection))
    dispatch(setStateConnection(stateConnection))
  }, [dispatch, stateConnection, chatConnection])

  return (
    <div className="app" data-theme={theme}>
      <AppRouter />
    </div>
  )
}

export default App
