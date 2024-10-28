import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App'
import { AuthProvider } from './contexts/AuthContext'
import { NotesProvider } from './contexts/NotesContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <NotesProvider>
          <App />
          <Toaster position="bottom-right" />
        </NotesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
