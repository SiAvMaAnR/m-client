import AppRouter from './routes/AppRouter'
import './App.scss'
import useRefreshToken from './hooks/useRefreshToken'

function App() {
  useRefreshToken()
  

  return (
    <div className="app">
      <AppRouter />
    </div>
  )
}

export default App
