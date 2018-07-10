import React, { Component } from 'react';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            age: ''
        }
    }
    handleName = (val) => {
        this.setState({name: val});
    }
    handleUsername = (val) => {
        this.setState({username: val});
    }
    handleEmail = (val) => {
        this.setState({email: val});
    }
    handlePassword = (val) => {
        this.setState({password: val});
    }
    handleAge = (val) => {
        this.setState({age: val});
    }
    register = () => {
        //Destructure the username, name, password, email, age from the state.
        const { name, username, email, password, age } = this.state;
    }
    render() {
        return (
            <div>
                Register 

            </div>
        );
    }
}