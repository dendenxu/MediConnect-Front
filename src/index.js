import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Server from './mock';
import theme from './theme/theme';
import App from './App';
import './index.css';
import applyBaseUrlToFetch from './baseUrl';

// Server(); // actually instantiating the mock server

// If we have a differing backend configured, replace the global fetch()
if (
  process.env.REACT_APP_BACKEND_API_BASE_URL !== undefined &&
  process.env.REACT_APP_BACKEND_API_BASE_URL !== ''
) {
  applyBaseUrlToFetch(process.env.REACT_APP_BACKEND_API_BASE_URL);
}

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          {/* <Route
        exact
        path="/"
        render={() => <Redirect to="/path/to/index" push />}
      /> */}
          <Route path="/" component={App} />
          {/* <Route path="/404" component={NotFound} /> */}
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
