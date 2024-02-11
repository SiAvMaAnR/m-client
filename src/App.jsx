import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useRefreshToken from './hooks/useRefreshToken'
import './App.scss'
import useSignalRHub from './hooks/useSignalRHub'
import { hub } from './utils/constants/system'

function App() {
  const theme = useSelector((state) => state.system.theme)

  useRefreshToken()
  useSignalRHub(hub.state)
  useSignalRHub(hub.chat)

  return (
    <div className="app" data-theme={theme}>
      <AppRouter />
    </div>
  )
}

export default App
