import React, { Component } from 'react';
import axios from 'axios'

export default class Contact extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            text: ''
        }
    }

    handleName(e){
        this.setState({
            name: e.target.value
        })
    }

    handleEmail(e){
        this.setState({
            email: e.target.value
        })
    }

    handleText(e){
        this.setState({
            text: e.target.value
        })
    }

    handleSubmitButton(){

        // event.preventDefault();
        const {name, email, text } = this.state
        console.log(this.state)
        let body = {name: name, email: email, text: text}
        axios.post('/api/contactform', body).then(response => {
            console.log('=======>response', response.data)
        }).catch(error => {
            console.log('=======error here=======', error)
        })
    }

    render() {
        console.log(this.state)
        return (
            <div>
                <div id="contact-form">
                    <fieldset>
                        <label htmlFor='name'>Name &#42;</label>
                        <input onChange={e => this.handleName(e)} id='name' type='text' placeholder='Your Name' name='name'/>
                        <label htmlFor='email'>Email &#42;</label>
                        <input onChange={e => this.handleEmail(e)} id='email' type='text' placeholder='Your Email'name='email' />
                        <label htmlFor='message'>Message &#42;</label>
                        <textarea onChange={e => this.handleText(e)} id='message' placeholder='Enter your message here' rows='8' name='message'/>
                        <button onClick={() => this.handleSubmitButton()} >Submit</button>
                    </fieldset>
                </div>
            </div>
        );
    }
}