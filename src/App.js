import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  useLocation,
  Switch,
} from 'react-router-dom';
import Signin from './pages/signin/Signin';
import Signup from './pages/signin/Signup';
import Result from './pages/process/Result';
import Chat from './pages/chat/Chat';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route exact path="/result" component={Result} />
        <Route exact path="/chat" component={Chat} />
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
