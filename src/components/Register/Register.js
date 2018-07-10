import React, { Component } from 'react';
import UserForm from './UserForm/UserForm';
import axios from 'axios';
//Import the css file.
import './Register.css';

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
        console.log('Hit handle Password-------------', val);
        this.setState({password: val});
    }
    handleAge = (val) => {
        this.setState({age: val});
    }
    register = () => {
        //Destructure the username, name, password, email, age from the state.
        const { name, username, email, password, age } = this.state;
        //Assign a newUser variable we will pass to the axios call to our endpoint.
        const newUser = { name, username, email, password, age };
        axios.post('/api/register', newUser).then(res => {
            console.log('Registered Successfully!');
        }).catch(err => console.log(err, 'Register Axios Error--------------'));
        console.log('register button clicked------------------');
    }
    render() {
        return (
            <div>
                Register 
                {/* Use the spread operator to automatically assign all the properties of an object.*/}
                <UserForm {...this.state} handleUsername={this.handleUsername} handleName={this.handleName} register={this.register}
                handlePassword={this.handlePassword} handleEmail={this.handleEmail} handleAge={this.handleAge}/>
            </div>
        );
    }
}