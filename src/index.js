/* eslint-disable no-restricted-globals */
import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Server from './mock';
import theme from './theme/theme';
import App from './App';
import './index.css';
import decorateFetch from './fetch';
import decorateWebSocket from './WebSocket';

// Server(); // actually instantiating the mock server

// If we have a differing backend configured, replace the global fetch()
const origin = process.env.REACT_APP_BACKEND_API_HOST;
const fetchProtocol = process.env.REACT_APP_FETCH_PROTOCOL || location.protocol;
const websocketProtocol =
  process.env.REACT_APP_WEBSOCKET_PROTOCOL ||
  (location.protocol === 'https' ? 'wss' : 'ws');
if (origin) {
  decorateFetch(origin, fetchProtocol);
  decorateWebSocket(origin, websocketProtocol);
}

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root'),
);
