import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/signin/Home';
import Signup from './pages/signup/Signup';
import Result from './pages/process/Result';
import Chat from './pages/chat/Chat';
import Record from './pages/record/Record';

export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Result" component={Result} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/Chat" component={Chat} />
      <Route exact path="/Record" component={Record} />
    </Router>
  );
}
