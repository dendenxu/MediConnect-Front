import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/signin/Home';
import Result from './pages/process/Result';
import DepList from './pages/process/dep_list';
import GuideResult from './pages/process/guid_result';

export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Result" component={Result} />
      <Route exact path="/Deps" component={DepList} />
      <Route exact path="/GuideResult" component={GuideResult} />
    </Router>
  );
}
