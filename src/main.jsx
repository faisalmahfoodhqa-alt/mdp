// src/main.jsx (أو index.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />  {/* ✅ App يحتوي على BrowserRouter */}
  </React.StrictMode>
);