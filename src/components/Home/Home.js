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
            alert(res.data.message);
        }).catch(err => console.log('Login Error---------------', err));
    }
    render() {
        return (
            <div>
                Home
                <Login login={this.login} {...this.state} handleUsername={this.handleLoginUsername} 
                 handlePassword={this.handleLoginPassword} />
            </div>
        );
    }
}