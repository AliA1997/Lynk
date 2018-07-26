import React from 'react';
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
import placeholderImage from '../../../../Images/default-placeholder.png';
//import css file
import './UserCard.css';


const UserCard = (props) => {
    const { id, profile_picture, username, name, email, groups, doDeleteUser, doWarnUser } = props;
    // console.log('groups----------', groups)
    return (
        <Card>
            <CardHeader 
                avatar={<Avatar src={profile_picture || placeholderImage} alt={username} />}
                title={username}
                subheader={name}
            />
            {groups && groups.length ? groups.map((group, i) => <Chip 
                                                                key={i}
                                                                avatar={<Avatar src={group.group_image || placeholderImage} alt={group.group_name} />}
                                                                label={group.group_name}
                                                            />)
                                   : null}
            <CardContent>
                <Typography color="primary">
                    Name: {name}, Username: {username}, Email: {email}
                </Typography>
            </CardContent>
            <Button variant="outlined" color="default" className="warning-button" onClick={() => props.sendWarning(id, email, username)}>Send Warning</Button>
            <TextField
                    required
                    multiline
                    rowsMax="5"
                    id="reason-for-warning"
                    label="Reason For Warning"
                    onChange={e => props.handleUserWarning(e.target.value)}
                    margin="normal"
                    style={{display: doWarnUser ? 'inline-block' : 'none'}}
            />
            <Button variant="outlined" className="delete-button" onClick={() => props.deleteUser(id, email, username)}>Delete</Button>
            <TextField
                    required
                    multiline
                    rowsMax="5"
                    id="reason-for-warning"
                    label="Reason For Delete"
                    onChange={e => props.handleUserDelete(e.target.value)}
                    margin="normal"
                    style={{display: doDeleteUser ? 'inline-block' : 'none'}}
            />
        </Card>
    )
}

export default UserCard;