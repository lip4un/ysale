import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './i18n'
import { ThemeProvider } from './context/ThemeContext'
import { WhiteLabelProvider } from './context/WhiteLabelContext'

import { AppProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <WhiteLabelProvider>
      <ThemeProvider>
        <AppProvider>
          <App />
        </AppProvider>
      </ThemeProvider>
    </WhiteLabelProvider>
  </React.StrictMode>,
)
