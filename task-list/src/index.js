import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { ToastContainer } from 'react-toastify';
import { ConfirmProvider } from './contexts/ConfirmContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ConfirmProvider>
      <ToastContainer position="top-right" autoClose={3000} />
      <App />
    </ConfirmProvider>
  </React.StrictMode>
);