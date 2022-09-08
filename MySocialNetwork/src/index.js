import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import App from './App';
import store from './redux/redux-Store';
import { Provider } from 'react-redux';
import 'typeface-roboto';
require('typeface-roboto');
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter /* basename={process.env.PUBLIC_URL} */>
    <Provider store={store}>
      <App store={store} dispatch={store.dispatch.bind(store)} />
    </Provider>
  </HashRouter>
);
