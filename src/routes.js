//import react, becuase you are using react-router-dom.
import React from 'react';
//import Route and Switch from react-router-dom 
import { Route, Switch } from 'react-router-dom';

//
//Components
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Register from './components/Register/Register';
import LoginPage from './components/LoginPage/LoginPage';
import CreateGroup from './components/CreateGroup/CreateGroup';
import CreateEvent from './components/CreateEvent/CreateEvent';
import Group from './components/Group/Group';
import GroupSearch from './components/GroupSearch/GroupSearch';
import EventSearch from './components/EventSearch/EventSearch';

//Export a default do does not have to be named.
export default (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/login' component={LoginPage} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route path='/dashboard/create_group' component={CreateGroup} />
        <Route path='/dashboard/create_event' component={CreateEvent} />
        <Route path='/groups' component={GroupSearch} />
        <Route path='/groups/:id' component={Group} />
        <Route path='/events' component={EventSearch} />
        <Route path='/about' component={About} />
        <Route path='/contact' component={Contact} />
    </Switch>
)
