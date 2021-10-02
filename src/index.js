/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { deepOrange, orange } from '@mui/material/colors';
import { CssBaseline } from '@mui/material';
import './index.css';
import App from './App';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: deepOrange[500],
    },
    secondary: {
      main: orange[500],
    },
  },
  typography: {
    fontFamily: 'Encode Sans',
    fontSize: 14,
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
