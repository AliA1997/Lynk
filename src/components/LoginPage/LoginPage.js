import React, { Component } from 'react';
import Login from './Login/Login';
import { login } from '../../ducks/reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
//import facebook login
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
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
    facebookLogin = (response) => {
        alert(JSON.stringify(response.id));
        let newUser = {
            facebookId: response.id,
            name: response.name, 
            email: response.email,
            profile_picture: response.picture.data.url
        }
        axios.post('/api/facebook-login', newUser).then(res => {
            alert(res.data.message);
            this.props.login(res.data.user);
        }).catch(err => console.log('facebook login error-----------------', err));
    }
    googleLogin = (response) => {
        const { email, name, imageUrl, googleId } = res.profileObj;
        let newUser = {
            googleId: googleId,
            email: email,
            name: name,
            profile_picture: imageUrl
        }
        console.log('newUser---------------', newUser);
        axios.post('/api/google-login', newUser).then(res => {
            alert(res.data.message);
            this.props.login(res.data.user);
        }).catch(err => console.log('google login error-------------------', err));
    }
    render() {
        const { username, password } = this.state;
        return (
            <div className='login-parent'>
                <div className='login-page-container-div'>
                    <h4>Login</h4>
                    <div>
                        <Login username={username} password={password} login={this.login} 
                        handleUsername={this.handleLoginUsername}  handlePassword={this.handleLoginPassword} />
                    </div>
                    <Link to='/register' style={{color: "indigo"}}>Don't have an account?</Link>
                    <div className='social-media-login'>

                        <FacebookLogin 
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            autoLoad={true}q
                            textButton='Login'
                            fields="name,email,picture"
                            callback={this.facebookLogin} 
                            render={renderProps => <TiSocialFacebookCircular onClick={renderProps.facebookLogin} style={{fontSize: '3em'}}/>}
                        />
                        <TiSocialGithub style={{fontSize: '3em'}} />
                        <TiSocialGooglePlusCircular style={{fontSize: '3em'}} />
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