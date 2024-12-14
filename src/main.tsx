import { BrowserRouter } from 'react-router-dom'
import * as ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { GoogleOAuthProvider } from '@react-oauth/google'
import AuthProvider from './context/AuthProvider'
import { store } from './store/index'
import App from './app/App'
import './app/index.scss'
import './i18n'
// import { PersistGate } from 'redux-persist/integration/react'
// import { persistor, store } from './store'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <GoogleOAuthProvider clientId="1093771698029-oam47587mt118po20kj68sv1tvj4e8jr.apps.googleusercontent.com">
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          {/* <PersistGate loading={null} persistor={persistor}> */}
          <App />
          {/* </PersistGate> */}
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </GoogleOAuthProvider>,
)
