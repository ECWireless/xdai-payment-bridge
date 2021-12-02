import React from 'react';
import ReactDOM from 'react-dom';
import type {} from 'styled-components/cssprop';
import 'index.css';
import { WalletProvider } from 'contexts/WalletContext';
import App from 'App';

ReactDOM.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
