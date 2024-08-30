// import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import ReactDOM from 'react-dom/client'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App'
import { persistor, store } from './redux/store'
import { Error } from './pages/_exports'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ErrorBoundary fallback={<Error />}>
          <App />
        </ErrorBoundary>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
)
