import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { setupStore } from './store';
import { Provider } from 'react-redux';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';
import theme from './utils/theme';

import { createRoot } from 'react-dom/client';

const domNode = document.getElementById('root');
const root = createRoot(domNode);
const store = setupStore({});

root.render(
  <Provider store={store}>
    <CookiesProvider>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </CookiesProvider>
  </Provider>
  );
