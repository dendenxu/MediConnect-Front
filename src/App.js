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
import EditPass from './pages/signin/EditPass';
import Chat from './pages/chat/Chat';
import Record from './pages/record/Record';
import Browse from './pages/case/Browse';
import RecordPatient from './pages/record/Record_Patient';
import BrowsePatient from './pages/case/Browse_Patient';
import CreateRecord from './pages/record/Create_Record';
// process-G4
import Success from './pages/process/Success';
import Fail from './pages/process/Fail';
import GuideResult from './pages/process/GuideResult';
import DepartmentList from './pages/process/DepartmentList';
import DepartmentInfo from './pages/process/DepartmentInfo';
import MediSearch from './pages/process/MediSearch';
import ChatPatient from './pages/chat/ChatPatient';
import Patient from './pages/signin/Patient';
import Doctor from './pages/signin/Doctor';

export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/signin" />
        </Route>
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Route path="/patient" component={Patient} />
        <Route path="/doctor" component={Doctor} />
        <Route path="/editpass" component={EditPass} />
        <Route path="/chat" component={Chat} />
        <Route exact path="/ChatPatient" component={ChatPatient} />
        {/* process G4 */}
        <Route path="/search" component={MediSearch} />
        <Route path="/departments" component={DepartmentList} />
        <Route path="/guide-result" component={GuideResult} />
        <Route path="/success" component={Success} />
        <Route path="/fail" component={Fail} />
        <Route path="/browse" component={Browse} />
        <Route path="/record" component={Record} />
        {/* <Route path="/reglist" component={RegList} /> */}
        {/* <Route path="/reginfo" component={RegInfo} /> */}
        <Route path="/browse_p" component={BrowsePatient} />
        <Route path="/record_p" component={RecordPatient} />
        <Route path="/create_record" component={CreateRecord} />
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
        // eslint-disable-next-line react/jsx-key
        <h3>
          <code>{msg}</code>
        </h3>
      ))}
    </div>
  );
}
