//import react, becuase you are using react-router-dom.
import React from 'react';
//import Route and Switch from react-router-dom 
import { Route, Switch } from 'react-router-dom';

//
//Components
// import About from './components/About/About';
// import Contact from './components/Contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/Home/Home';
import Register from './components/Register/Register';

//Export a default do does not have to be named.
const routes = (
    <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/register' component={Register} />
        <Route path='/dashboard' component={Dashboard} />
        {/* <Route path='/about' component={About} /> */}
        {/* <Route path='/contact' component={Contact} /> */}
    </Switch>
)
export default routes;