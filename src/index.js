import React from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './context/auth-context';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import App from './App';

const theme = createTheme({
  palette: {
    common: {
      green: '#00ff00',
      red: '#fe0101',
      yellow: '#fbe51f'
    }
  }
});

ReactDOM.render(
  <AuthContextProvider>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </AuthContextProvider>,
  document.getElementById('root')
);
