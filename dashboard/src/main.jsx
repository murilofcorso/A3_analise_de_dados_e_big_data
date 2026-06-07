import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './dashboard_inadimplencia.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
