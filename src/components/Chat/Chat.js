import React, { Component } from 'react';

export default class Chat extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
            messages: [],
            users: []
        }

    }
    handleMessageChange(val) {
        this.setState({message: val});
    }
    render() {
        return (
            <div>
                <div>
                    <h1>Messages</h1>
                    <div className='chat-messages-list'>
                    </div>
                    <h1>Users</h1>
                    <div className='chat-users-list'>
                    </div>
                </div>
            </div>
        );
    }
}