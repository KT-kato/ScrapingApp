import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { App } from './components/App'

// モックは開発環境のみで起動
if (import.meta.env.VITE_MOCK_SERVER) {
  const { worker } = await import('./mocks/browser')
  worker.start()
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
