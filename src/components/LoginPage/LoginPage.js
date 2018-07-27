import React, { Component } from 'react';
import Login from './Login/Login';
import { login, resetPassword } from '../../ducks/reducer';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import TiSocialFacebookCircular from 'react-icons/lib/ti/social-facebook-circular';
import TiSocialGithub from 'react-icons/lib/ti/social-github-circular';
// import TiSocialGooglePlusCircular from 'react-icons/lib/ti/social-google-plus-circular';
import './LoginPage.css';


class LoginPage extends Component {
    constructor() {
        super();
        this.state = {
            username: '', 
            password: '',
            resetUsername: '',
            resetEmail: '',
            doResetPassword: false
        }
    }
    componentWillMount() {
        clearTimeout();
    }
    handleLoginUsername = (val) => {
        this.setState({username: val});
    }
    handleLoginPassword = (val) => {
        this.setState({password: val});
    }
    handleResetUsername = (val) => {
        this.setState({resetUsername: val});
        console.log('afs')
    }
    handleResetEmail = (val) => {
        this.setState({resetEmail: val});
        console.log('afsd')

    }
    resetPassword() {
        const { doResetPassword, resetUsername, resetEmail } = this.state;
        console.log(this.state);
        console.log('clicked!');
        if(doResetPassword && resetUsername && resetEmail) {
            axios.post('/api/forgot_password', {username: resetUsername, email: resetEmail})
            .then(res => {
                this.props.resetPassword(resetUsername);
                this.setState({doResetPassword: false, resetUsername: '', resetEmail: ''})
                console.log('Reset Password Working');
                alert('Look at your email!');
            }).catch(err => console.log('Forgot Password Error----------', err));
        } else {
            this.setState({doResetPassword: !this.state.doResetPassword});
        }
    }
    login = () => {
        //Destructure the username from the state, so it can be used in the login endpoint.
        const { username, password } = this.state;
        const loginInfo = { username, password };
        axios.post('/api/login', loginInfo)
        .then(res => {
            this.props.login(res.data.user);
            alert('Login Successfully');
            this.props.history.push('/dashboard');
        }).catch(err => console.log('Login Error---------------', err));
    }
    // facebookLogin = (response) => {
    //     alert(JSON.stringify(response.id));
    //     let newUser = {
    //         facebookId: response.id,
    //         name: response.name, 
    //         email: response.email,
    //         profile_picture: response.picture.data.url
    //     }
    //     axios.post('/api/facebook-login', newUser).then(res => {
    //         alert(res.data.message);
    //         this.props.login(res.data.user);
    //     }).catch(err => console.log('facebook login error-----------------', err));
    // }
    // googleLogin = (response) => {
    //     const { profileObj } = response
    //     let newUser = {
    //         facebookId: profileObj.googleId,
    //         name: profileObj.name, 
    //         email: profileObj.email,
    //         profile_picture: profileObj.imageUrl
    //     };
    //     axios.post('/api/google-login', newUser).then(res => {
    //         alert(res.data.message);
    //         this.props.login(res.data.user);
    //     }).catch(err => console.log('Google Login Error---------------', err));
    // }
    // rejectGoogleLogin = (response) => {
    //     console.log("Reject Google Login---------------", response);
    // }
    // componentWillUnmount() {
    //     clearTimeout();
    //     clearInterval();
    // }
    render() {
        const { username, password, doResetPassword, resetEmail, resetUsername } = this.state;
        return (
            <div className='login-parent'>
                <div className='login-page-container-div'>
                    <h4>Login</h4>
                    <div>
                        <Login username={username} password={password} login={this.login} 
                        handleUsername={this.handleLoginUsername}  handlePassword={this.handleLoginPassword} />
                    </div>
                    <Link to='/register' style={{color: "indigo"}}>Don't have an account?</Link>
                    <div className='reset-password-button'>
                        <Button variant="outlined"  color="primary"
                        onClick={() => this.resetPassword()}>Reset Password</Button>
            
                            <div style={{style: doResetPassword ? 'inline-block' : 'none'}}>
                                <TextField
                                required
                                style={{style: doResetPassword ? 'inline-block' : 'none'}}
                                id="user-email"
                                label="Your Email"
                                onChange={e => this.handleResetEmail(e.target.value)}
                                value={resetEmail}
                                margin="normal"
                                />
                                <TextField
                                required
                                id="uYour-Username"
                                label="Your Username"
                                onChange={e => this.handleResetUsername(e.target.value)}
                                value={resetUsername}
                                margin="normal"
                                />
                            </div>
                    </div>
                    <div className='social-media-login'>

                        {/* <FacebookLogin 
                            appId={process.env.REACT_APP_FACEBOOK_APP_ID}
                            autoLoad={true}
                            textButton='Login'
                            fields="name,email,picture"
                            onClick={(response) => this.facebookLogin(response)} 
                            render={renderProps => <TiSocialFacebookCircular onClick={renderProps.facebookLogin} style={{fontSize: '3em'}}/>}
                        /> */}
                        <TiSocialGithub style={{fontSize: '3em'}} />
                        {/* <GoogleLogin
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            style={{height: '4em', width: '4em'}}
                            onSuccess={this.googleLogin}
                            onFailure={this.rejectGoogleLogin}
                        >
                        <TiSocialGooglePlusCircular style={{fontSize: '3.5em', background: 'transparent'}} />
                        </GoogleLogin> */}
                    </div>
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: login,
    resetPassword
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginPage));