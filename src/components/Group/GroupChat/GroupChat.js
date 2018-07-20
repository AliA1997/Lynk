import React from 'react';
import Typography from '@material-ui/core/Typography';

const GroupChat = (props) => {
    const { users, messages } = props;
    return (
        <div>
            <Typography>Messages</Typography>
            <div className='groupchat-messages-div'>
                {messages && messages.length && messages.map(message => <div>{message.text}</div>)}
            </div>
            <Typography>Users</Typography>
            <div className='groupchat-users-div'>
                {users && users.length && users.map(user => <div>{user.name}</div>)}
            </div>
        </div>
    );
};

export default GroupChat;