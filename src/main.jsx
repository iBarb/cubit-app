import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { SessionProvider } from './Context/SessionContext.jsx'
import { TimerProvider } from './Context/TimerContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SessionProvider>
      <TimerProvider>
        <App />
      </TimerProvider>
    </SessionProvider>
  </React.StrictMode>,
)
