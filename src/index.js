import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import MainCointext from './context/MainCointext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
      <MainCointext>
            <App />
      </MainCointext>
);