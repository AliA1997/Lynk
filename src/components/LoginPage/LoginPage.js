import React, { Component } from 'react';
import Login from './Login/Login';
import { login } from '../../ducks/reducer';
import { Link, withRouter } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
import { connect } from 'react-redux';
import axios from 'axios';
import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import TiSocialGithub from 'react-icons/lib/ti/social-github-circular';
import TiSocialGooglePlusCircular from 'react-icons/lib/ti/social-google-plus-circular';
import './LoginPage.css';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '', 
            password: ''
        }
    }
    handleLoginUsername = (val) => {
        this.setState({username: val});
    }
    handleLoginPassword = (val) => {
        this.setState({password: val});
    }

    login = () => {
        //Destructure the username from the state, so it can be used in the login endpoint.
        const { username, password } = this.state;
        const loginInfo = { username, password };
        axios.post('/api/login', loginInfo)
        .then(res => {
            this.props.login(res.data.user);
            alert('Login Successfully');
            this.props.history.push('dashboard');
        }).catch(err => console.log('Login Error---------------', err));
    }
    googleLogin = (res) => {
        console.log(res);
        const { email, name, imageUrl, googleId } = res.profileObj;
        const newUser = { email, name, imageUrl, googleId };
        console.log('newUser---------------', newUser); 
    }
    rejectedLogin = (res) => {
        console.log('Login Rejected-----------------', res);
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <div className='login-page-container-div'>
                    <h4>Login</h4>
                    <div>
                        <Login username={username} password={password} login={this.login} 
                        handleUsername={this.handleLoginUsername}  handlePassword={this.handleLoginPassword} />
                    </div>
                    <Link to='/register' style={{color: "indigo"}}>Don't have an account?</Link>
                    <div className='social-media-login'>
                        <TiSocialFacebookCircular style={{fontSize: '3em'}}/>
                        <TiSocialGithub style={{fontSize: '3em'}} />
                        <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            onSuccess={this.googleLogin}
                            onFailure={this.rejectedLogin}
                            style={{width: '4em', background: 'transparent', border: '0.1px solid transparent'}}
                        >
                            <TiSocialGooglePlusCircular style={{fontSize: '3.5em'}} />
                        </GoogleLogin>
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: login 
}

export default withRouter(connect(null, mapDispatchToProps)(LoginPage));