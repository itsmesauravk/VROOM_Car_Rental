import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CityProvider } from './components/CityContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <CityProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </CityProvider>
);

