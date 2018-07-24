import React, { Component } from 'react';
//Importing Material UI Components
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
//Import images from images folder.
import placeholderImage from '../../../Images/default-placeholder.png';


const UserCard = (props) => {
    const { profile_picture, username, name, email, groups, userWarning, deleteUser, doDeleteUser, doWarnUser } = props;
    return (
        <Card>
            <CardHeader 
                avatar={<Avatar src={profile_picture || placeholderImage} alt={username} />}
                title={username}
                subheader={name}
            />
            {groups && groups.length ? groups.map(group => <Chip 
                                                                avatar={<Avatar src={group.group_image || placeholderImage} alt={group.group_name} />}
                                                                label={group.group_name}
                                                            />)
                                   : null}
            <CardContent>
                <Typography color="primary">
                    Name: {name}, Username: {username}, Email: {email}
                </Typography>
            </CardContent>
            <Button variant="contained" color="default" onClick={() => props.sendWarning()}>Send Warning</Button>
            <TextField
                    required
                    multiline
                    rowsMax="5"
                    id="reason-for-warning"
                    label="Reason For Warning"
                    onChange={e => props.handleUserWarning(e.target.value)}
                    value={userWarning}
                    margin="normal"
                    style={{display: doWarnUser ? 'inline-block' : 'none'}}
            />
            <Button variant="contained" color="error" onClick={() => props.deleteUser()}>Delete</Button>
            <TextField
                    required
                    multiline
                    rowsMax="5"
                    id="reason-for-warning"
                    label="Reason For Warning"
                    onChange={e => props.handleUserDelete(e.target.value)}
                    value={deleteUser}
                    margin="normal"
                    style={{display: doDeleteUser ? 'inline-block' : 'none'}}
            />
        </Card>
    )
}

export default UserCard;