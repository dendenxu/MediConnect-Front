import React from 'react';
import { Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/signin/Home';
import Result from './pages/process/Result';
import DepList from './pages/process/dep_list';
import GuideResult from './pages/process/guid_result';
import MediSearch from './pages/process/MediSearch';
import DeptInfo from './pages/process/DeptInfo';

export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Result" component={Result} />
      <Route exact path="/Deps" component={DepList} />
      <Route exact path="/GuideResult" component={GuideResult} />
      <Route exact path="/search" component={MediSearch} />
      <Route exact path="/deptinfo" component={DeptInfo} />
    </Router>
  );
}
