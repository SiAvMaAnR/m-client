import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useRefreshToken from './hooks/useRefreshToken'
import useSignalRHub from './hooks/useSignalRHub'
import { hub } from './constants/system'
import './App.scss'

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
