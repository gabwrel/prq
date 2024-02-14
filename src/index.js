// index.js

import React from 'react';
import { createRoot } from 'react-dom/client'; // Correct import
import App from './App';
import './index.css'

import './firebase.js'

const rootElement = document.getElementById('root');

// Replace ReactDOM.render with createRoot().render
const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
