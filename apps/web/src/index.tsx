import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'presentation/App';
import './shared/styles/bootstrap.custom.css';
import './shared/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
