import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { CityProvider } from './components/CityContext';
import { SelectCarProvider } from './components/SelectCarContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SelectCarProvider>
  <CityProvider>
  <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </BrowserRouter>
  </CityProvider>
  </SelectCarProvider>
);

