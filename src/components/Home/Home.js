import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Login from './Login/Login';
import axios from 'axios';


export default class Home extends Component {
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
            alert('Login Successfully');
        }).catch(err => console.log('Login Error---------------', err));
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <div>
                    <h4>Login</h4>
                    <Login username={username} password={password}
                    login={this.login}  handleUsername={this.handleLoginUsername}  handlePassword={this.handleLoginPassword} />
                </div>
            </div>
        );
    }
}