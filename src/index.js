import React from 'react';
import ReactDOM from 'react-dom';
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { history } from '@utils/history/history';
import { App } from './App';

import 'react-toastify/dist/ReactToastify.css';
import './assets/styles/_global.scss';

ReactDOM.render(
  <React.StrictMode>
    <HistoryRouter history={history}>
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
    </HistoryRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);
