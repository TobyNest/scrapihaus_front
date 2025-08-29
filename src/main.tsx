import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './app/app.tsx'
import './app/styles/global.css'
import { ThemeProvider } from './app/contexts/ThemeContext.tsx'
import { SearchProvider } from './app/contexts/searchContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SearchProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </SearchProvider>
  </React.StrictMode>
)
