import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import "bootstrap/dist/js/bootstrap.bundle.min"
import AuthProvider from './context/Auth.jsx'
import CartProvider from './context/CartContext.jsx'
import { HelmetProvider } from 'react-helmet-async'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <CartProvider>
    <AuthProvider>
      <HelmetProvider>
    <App />
      </HelmetProvider>
    </AuthProvider>
    </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
