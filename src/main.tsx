import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { BrowserRouter } from 'react-router'
import { ReactQueryProvider } from './context/QueryClientProvider'
import { ThemeProvider } from './context/ThemeProvider'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactQueryProvider>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </ReactQueryProvider>
  </StrictMode>
  ,
)
