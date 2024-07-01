import { useDispatch, useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useSignalRHub from './hooks/useSignalRHub'
import { hub } from './constants/system'
import { setChatConnection, setStateConnection } from './redux/slices/signalRSlice'
import './App.scss'

function App() {
  const theme = useSelector((state) => state.system.theme)
  const dispatch = useDispatch()

  useSignalRHub(hub.state, (connection) => dispatch(setStateConnection(connection)))
  useSignalRHub(hub.chat, (connection) => dispatch(setChatConnection(connection)))

  return (
    <div className="app" data-theme={theme}>
      <AppRouter />
    </div>
  )
}

export default App
