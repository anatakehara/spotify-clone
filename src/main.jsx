import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { PlayerProvider } from './context/PlayerContext.jsx'
import { LikesProvider } from './context/LikesContext.jsx'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <LikesProvider>
        <PlayerProvider>
          <App />
        </PlayerProvider>
      </LikesProvider>
    </BrowserRouter>
  </StrictMode>,
)