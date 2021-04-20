import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import Home from "./components/signin/Home";
import Result from "./components/process/Result";

export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Result" component={Result} />
    </Router>
  );
}
