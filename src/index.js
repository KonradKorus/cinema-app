import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/index.css';
import '@fontsource/roboto/300.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { pink } from '@mui/material/colors';

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: pink[500],
    },
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1020,
      lg: 1200,
      xl: 1536,
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
