import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
  Switch,
} from 'react-router-dom';
import Signin from './pages/signin/Signin';
import Signup from './pages/signin/Signup';
import Chat from './pages/chat/Chat';

// process-G4
import Success from './pages/process/Success';
import Fail from './pages/process/Fail';
import GuideResult from './pages/process/GuideResult';
import DepartmentList from './pages/process/DepartmentList';
import DepartmentInfo from './pages/process/DepartmentInfo';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/chat" component={Chat} />
        {/* process G4 */}
        <Route path="/departments" component={DepartmentList} />
        <Route path="/guide-result" component={GuideResult} />
        <Route path="/success" component={Success} />
        <Route path="/fail" component={Fail} />
        <Route>
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
}

function NoMatch() {
  const location = useLocation();
  return (
    <div>
      <h2>
        <code>No match for path:</code>
      </h2>
      <h1>
        <code>{location.pathname}</code>
      </h1>
      {[
        'Check your url:',
        '- for signin, use /signin',
        '- for signup, use /signup',
        '- for chat, use /chat',
        '- for result, use /result',
        '- / will be redirected to /signin',
      ].map(msg => (
        <h3>
          <code>{msg}</code>
        </h3>
      ))}
    </div>
  );
}
