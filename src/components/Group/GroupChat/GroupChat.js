import React from 'react';
import Typography from '@material-ui/core/Typography';
import './GroupChat.css';

const GroupChat = (props) => {
    const { users, messages } = props;
    return (
        <div>
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
        </div>
    );
};

export default GroupChat;