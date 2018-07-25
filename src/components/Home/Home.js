import React, { Component } from 'react';
import GroupChat from '../Group/GroupChat/GroupChat';
//Redirects the user 
import { withRouter, Link } from 'react-router-dom';
//Connects the component to the store.
import { connect } from 'react-redux';
//Import the components from material-ui
import { login } from '../../ducks/reducer';
import Button from '@material-ui/core/Button';
import "../Home/Home.css";
//image
import lynk from '../../Images/lynk.jpg'
import Group from '../Group/Group';



class Home extends Component {
    // constructor() {
    //     super();

    // }
    // handleLoginUsername = (val) => {
    //     this.setState({username: val});
    // }
    // handleLoginPassword = (val) => {
    //     this.setState({password: val});
    // }
    // login = () => {
    //     //Destructure the username from the state, so it can be used in the login endpoint.
    //     const { username, password } = this.state;
    //     const loginInfo = { username, password };
    //     axios.post('/api/login', loginInfo)
    //     .then(res => {
    //         this.props.login(res.data.user);
    //         alert('Login Successfully');
    //         this.props.history.push('dashboard');
    //     }).catch(err => console.log('Login Error---------------', err));
    // }
    render() {
        // const { username, password } = this.state;
        return (
            <div className='home-page-div'>
                <div className='landing-image'>
                    <img src={lynk} alt="pic for now"/>
                </div>
                <div className='landing-page-description'>
                    <h1>Join families and friends to LynkUp</h1>
                    <h2>- Create public and private events</h2>
                    <h2>- Create groups and chat</h2>
                    <h2>- Schedule your events with our calender</h2>
                    <h1>Sign up Now</h1>
                    <div className='button-login'>
                        <Button variant='outlined' color='primary'>
                            <Link to='/login' style={{color: 'indigo'}}>
                                Login/Signup
                            </Link>
                        </Button>
                    </div>
                    <div>Fucking Chat!!</div>
                    <GroupChat />
                </div>
            </div>
        );
    }
}
//Map the state to props
const mapStateToProps = state => {
    return {
        user: state.user
    };
}
//Map the dispatcher to props.
const mapDispatchToProps = {
    login: login
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));