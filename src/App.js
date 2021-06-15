import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import Home from './pages/signin/Home';
import Signup from './pages/signup/Signup';
import Chat from './pages/chat/Chat';

// process-G4
import Success from './pages/process/Success';
import Fail from './pages/process/Fail';
import DepartmentList from './pages/process/DepartmentList';
import DepartmentInfo from './pages/process/DepartmentInfo';


export default function App() {
  return (
    <Router history={createBrowserHistory()}>
      <Route exact path="/" component={Home} />
      <Route exact path="/Signup" component={Signup} />
      <Route exact path="/Chat" component={Chat} />
      
      {/* process G4 */}
      <Route exact path="/departments" component={DepartmentList}/>
      <Route exact path="/department" component={DepartmentInfo}/>
      <Route exact path="/success" component={Success}/>
      <Route exact path="/fail" component={Fail}/>
    </Router>
  );
}
