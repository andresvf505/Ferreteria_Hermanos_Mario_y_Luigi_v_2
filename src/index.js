import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './App.css'; // <-- ESTA LÍNEA CARGA LOS ESTILOS EN TODO EL PROYECTO

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);