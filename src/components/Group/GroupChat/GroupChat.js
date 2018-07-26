import React from 'react';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './GroupChat.css';

const GroupChat = (props) => {
    const { users, messages, messageBody } = props;
    return (
        <div className="groupchat-container">
            <div className='groupchat-messages-container-div'>
                <Typography>Messages</Typography>
                <div className='groupchat-messages-div'>
                    {messages && messages.length && messages.map(message => <div>{message.text}</div>)}
                </div>
            </div>
            <div className='groupchat-users-container-div'>
                <Typography>Users</Typography>
                <div className='groupchat-users-div'>
                    {users && users.length && users.map(user => <div>{user.name}</div>)}
                </div>
            </div>
            <TextField
                required
                id="name"
                label="Send Message"
                onChange={e => props.handleMessage(e.target.value)}
                value={messageBody}
                margin="normal"
            />
            <Button onClick={(e) => props.sendMessage(e)}>Send Message</Button>
        </div>
    );
};

export default GroupChat;