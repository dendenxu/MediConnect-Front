import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/signin/Home';
import Signup from './pages/signup/Signup';
import Chat from './pages/chat/Chat';

// process-G4
import Success from './pages/process/Success';
import Fail from './pages/process/Fail';
import GuideResult from './pages/process/GuideResult';
import DepartmentList from './pages/process/DepartmentList';
import DepartmentInfo from './pages/process/DepartmentInfo';
import RegList from './pages/process/RegList';

export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/Chat" component={Chat} />

      {/* process G4 */}
      <Route exact path="/departments" component={DepartmentList} />
      <Route exact path="/guide-result" component={GuideResult} />
      <Route exact path="/success" component={Success} />
      <Route exact path="/fail" component={Fail} />
      <Route exact path="/reglist" component={RegList} />
    </Router>
  );
}
