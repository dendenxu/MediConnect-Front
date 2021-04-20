import React from "react";
import ReactDOM from "react-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/theme";
import App from "./App";
import "./style/index.css";
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

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
  document.getElementById("root")
);
