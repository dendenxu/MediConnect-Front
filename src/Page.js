import React from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import App from "./App";

// eslint-disable-next-line import/no-anonymous-default-export
export default () => (
  <Router>
    <Switch>
      {/* <Route
        exact
        path="/"
        render={() => <Redirect to="/path/to/index" push />}
      /> */}
      <Route path="/app" component={App} />
      {/* <Route path="/404" component={NotFound} /> */}
      {/* <Route component={NotFound} /> */}
    </Switch>
  </Router>
);
