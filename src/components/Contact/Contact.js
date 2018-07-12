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
        const {name, email, text } = this.state
        axios.post('/api/contact', {
            name,
            email,
            text
        }).then(response => {
            console.log('=======>response', response)
        })
    }

    render() {
        return (
            <div>
                <form action="/contact" id="contact-form" method="post" role="form">
                    <fieldset>
                        <label for='name'>Name &#42;</label>
                        <input id='name' type='text' placeholder='Your Name' required='required'>
                        <label for='email'>Email &#42;</label>
                        <input id='email' type='text' placeholder='Your Email' required='required'>
                        <label id='message'>Message &#42;<label>
                            
                    </fieldset>
                </form>

            </div>
        );
    }
}