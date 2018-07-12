import React, { Component } from 'react';
import axios from 'axios'

export default class  extends Component {
    constructor(){
        super()
        this.state = {
            name: '',
            email: '',
            text: ''
        }
        this.handleName = this.handleName.bind(this)
        this.handleEmail = this.handleEmail.bind(this)
        this.handleText = this.handleText.bind(this)
        this.handleSubmitButton = this.handleSubmitButton(this)
    }

    handleName(e){
        this.setState({
            name: e
        })
    }

    handleEmail(e){
        this.setState({
            email: e
        })
    }

    handleText(e){
        this.setState({
            text: e
        })
    }

    handleSubmitButton(e){
        console.log('handleSubmitButton', e)
        const {name, email, text } = this.state
        axios.post('/api/contact', {
            name,
            email,
            text
        }).then(response => {
            console.log('=======>response', response.data)
        })
    }

    render() {
        return (
            <div>
                <form action="/contact" id="contact-form" method="post" role="form">
                    <fieldset>
                        <label htmlFor='name'>Name &#42;</label>
                        <input onChange={event => this.handleName(event.target.value)} id='name' type='text' placeholder='Your Name' required='required'/>
                        <label htmlFor='email'>Email &#42;</label>
                        <input onChange={event => this.handleEmail(event.target.value)} id='email' type='text' placeholder='Your Email' required='required'/>
                        <label htmlFor='message'>Message &#42;</label>
                        <textarea onChange={event => this.handleText(event.target.value)} id='message' placeholder='Enter your message here' rows='8' required='required'></textarea>
                        <button onClick={(e) => this.handleSubmitButton(e)} type='submit'>Submit</button>
                    </fieldset>
                </form>
            </div>
        );
    }
}