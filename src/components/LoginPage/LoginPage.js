import React, { Component } from 'react';
import Login from './Login/Login';
import { login } from '../../ducks/reducer';
import { connect } from 'react-redux';
import axios from 'axios';
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
                </div>
            </div>
        );
    }
}

const mapDispatchToProps = {
    login: login 
}

export default connect(null, mapDispatchToProps)(LoginPage);