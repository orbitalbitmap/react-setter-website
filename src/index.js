import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@mui/material/styles';
import { store } from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';
import theme from './utils/theme';
// import history from './history'

ReactDOM.render(
  <Provider store={store}>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CookiesProvider>
  </Provider>,
  document.getElementById('root'),
);
