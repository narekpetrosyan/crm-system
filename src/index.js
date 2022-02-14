import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { history } from '@utils/history/history';
import App from './App';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/_global.scss';

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <App />
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </Router>
  </React.StrictMode>,
  document.getElementById('root'),
);
