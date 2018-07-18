import React, { Component } from 'react';
import axios from 'axios'
import '../Contact/Contact.css'

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
            <div className="formsss">
                <div className="textsss">
                    <h1>Contact</h1>
                    <h2>Please contact us if you have any questions or concerns.</h2>
                </div>
                <div id="contact-form">
                    <fieldset>
                        <div className="label-name">
                            <label htmlFor='name'>Name&#42;</label>
                            <input onChange={e => this.handleName(e)} id='name' type='text' placeholder='Your Name' name='name'/>
                            <label htmlFor='email'>Email&#42;</label>
                            <input onChange={e => this.handleEmail(e)} id='email' type='text' placeholder='Your Email'name='email' />
                        </div>
                        <br/>
                        <div className="label-message">
                            <label htmlFor='message'>Message&#42;</label>
                            <textarea onChange={e => this.handleText(e)} id='message' placeholder='Enter your message here' rows='8' name='message'/>
                        </div>
                        <div className="submit-button">
                            <button onClick={() => this.handleSubmitButton()} >Submit</button>
                        </div>
                    </fieldset>
                </div>
            </div>
        );
    }
}