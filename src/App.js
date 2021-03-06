import React, { Component } from 'react';
import { connect } from 'react-redux';
//import actions 
import { getUserCoordinates } from'./ducks/reducer';
import { withRouter } from 'react-router-dom';
import { login } from './ducks/reducer';
import axios from 'axios';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';
// import amber from '@material-ui/core/colors/amber';
import green from '@material-ui/core/colors/green';
// import red from '@material-ui/core/colors/red';
import routes  from './routes';
import Header from './components/Global/Header/Header';
import Footer from './components/Global/Footer/Footer';
import './App.css';

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: indigo,
    secondary: green,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  }
});

class App extends Component {
  componentDidMount() {
    //Destruct the login dispatcher from the reducer.
    const { login } = this.props;
    //Perform an axios call for the session, everytime app rerenders
    axios.get('/api/user-data')
    .then(res => {
      console.log('user data------------', res.data.user);
      //If the data coming back is not undefined set the session to the user state in the reducer.
      if(res.data.user) {
        login(res.data.user);
      }
    }).catch(err => console.log("Get user data axios error---------------", err));
  }
  render() {
    return (
      <div className="parent-className">
        <MuiThemeProvider theme={theme}>
          <Header />
          {routes}
          <Footer />
        </MuiThemeProvider>
      </div>
    );
  }
}

const mapDispatchToProps = {
  login: login
}

export default withRouter(connect(null, mapDispatchToProps)(App));
