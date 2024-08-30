import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useSignalRHub from './hooks/useSignalRHub'
import { hub } from './constants/system'
import { setChatConnection, setStateConnection } from './redux/slices/signalRSlice'
import useRefreshToken from './hooks/useRefreshToken'
import './App.scss'

function App() {
  const theme = useSelector((state) => state.system.theme)
  const dispatch = useDispatch()

  useRefreshToken()
  const stateConnection = useSignalRHub(hub.state)
  const chatConnection = useSignalRHub(hub.chat)
  
  useEffect(() => {
    dispatch(setStateConnection(stateConnection))
    dispatch(setChatConnection(chatConnection))
  }, [dispatch, stateConnection, chatConnection])

  return (
    <div className="app" data-theme={theme}>
      <AppRouter />
    </div>
  )
}

export default App
