import { useSelector } from 'react-redux'
import AppRouter from './routes/AppRouter'
import useRefreshToken from './hooks/useRefreshToken'
import './App.scss'

function App() {
  const theme = useSelector((state) => state.system.theme)

  useRefreshToken()

  return (
    <div className="app" data-theme={theme}>
      <AppRouter />
    </div>
  )
}

export default App
