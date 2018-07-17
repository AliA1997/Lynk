import React, { Component } from 'react';
import UserForm from './UserForm/UserForm';
import axios from 'axios';
//Import the css file.
import './Register.css';

const CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/lynk00/image/upload';

export default class Register extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            username: '',
            email: '',
            password: '',
            age: '',
            profile_picture: ''
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
    handleUpload = files => {

        //axios call to server to request hashed signature
        console.log('file', files)
        console.log('files', files[0])
        axios.get('/api/upload').then(response => {
        console.log(response.data)
        
        //form data for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
        formData.append("timestamp", response.data.payload.timestamp)
        formData.append("file", files[0]);

        for(var pair of formData.entries()) {
            console.log(pair); 
         }
         console.log('formData---------------', formData);
        //axios call to cloudinary using the URL set at top 
            axios.post(CLOUDINARY_URL, formData).then(response => {
                console.log(response.data);

                // Setting state with the secure_url
                this.setState({
                    profile_picture: response.data.secure_url
                })
            }).catch( err => console.log("CLoudinary Database Errorr------------", err));
        }).catch(err => console.log("get credentail error-----------", err));
    }
    handleAge = (val) => {
        this.setState({age: val});
    }
    register = () => {
        //Destructure the username, name, password, email, age from the state.
        const { name, username, profile_picture, email, password, age } = this.state;
        //Assign a newUser variable we will pass to the axios call to our endpoint.
        const newUser = { name, username, profile_picture, email, password, age };
        axios.post('/api/register', newUser).then(res => {
            //Redirects user.
            alert('Registered Successfully!');
        }).catch(err => console.log(err, 'Register Axios Error--------------'));
        console.log('register button clicked------------------');
    }
    render() {
        return (
            <div className="register-container-div">
                <h4>Register</h4>
                {/* Use the spread operator to automatically assign all the properties of an object.*/}
                <UserForm {...this.state} handleUsername={this.handleUsername} handleName={this.handleName} register={this.register} 
                handlePassword={this.handlePassword} handleEmail={this.handleEmail} handleAge={this.handleAge} handleUpload={this.handleUpload}/>
            </div>
        );
    }
}