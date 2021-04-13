import React from "react";
import { Grid, Typography } from "@material-ui/core";
import {BrowserRouter as Router , Route} from 'react-router-dom'
import { createBrowserHistory } from "history";
import SignIn from "./SignIn";
import Home from "./Home"

export default function App() {
  const cool = false;
  return (
    <Router history={createBrowserHistory()}>
        <Route exact path="/" component={Home} />
        <Route path='/SignIn' component={SignIn}/>
    </Router>
  )
}
