import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import App from './App'
import { AuthnContextProvider } from "./contexts/AuthnContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthnContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthnContextProvider>
  </React.StrictMode>
)
