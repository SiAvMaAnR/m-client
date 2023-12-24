import AppRouter from './routes/AppRouter'
import useTokenTimeout from './hooks/useTokenTimeout'
import './App.scss'

function App() {

  return (
    <div className="app">
      <AppRouter />
    </div>
  )
}

export default App
