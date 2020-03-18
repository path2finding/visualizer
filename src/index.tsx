import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import * as React from 'react';

import { configureStore } from './store/store';
import './assets/sass/main.scss';
import App from './views';

export const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#root')
);

serviceWorker.register();
