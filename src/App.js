import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/signin/Home';
import Signup from './pages/signup/Signup';
import Result from './pages/process/Result';
import Chat from './pages/chat/Chat';

export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/">
        <Redirect to="/user/signin" />
      </Route>
      <Route exact path="/user/signin" component={Home} />
      <Route exact path="/user/signup" component={Signup} />
      <Route exact path="/result" component={Result} />
      <Route exact path="/chat" component={Chat} />
    </Router>
  );
}
