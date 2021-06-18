import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Server from './mock';
import theme from './theme/theme';
import App from './App';
import './index.css';
import decorateFetch from './fetch';

// Server(); // actually instantiating the mock server

// If we have a differing backend configured, replace the global fetch()
if (
  process.env.REACT_APP_BACKEND_API_HOST !== undefined &&
  process.env.REACT_APP_BACKEND_API_HOST !== ''
) {
  decorateFetch(process.env.REACT_APP_BACKEND_API_HOST);
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
