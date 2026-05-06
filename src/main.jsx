// src/main.jsx (أو index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './shared/styles/tokens.css';
import './shared/styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* ✅ App يحتوي على BrowserRouter */}
  </React.StrictMode>
);