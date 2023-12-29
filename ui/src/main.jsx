import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom'

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"

const queryClient = new QueryClient({
  defaultOptions: { queries: { staleTime: 60 * 60 * 130 } }
}
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>,
)
