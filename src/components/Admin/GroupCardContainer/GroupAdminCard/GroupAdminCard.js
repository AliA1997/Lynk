import React from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import placeholderImage from '../../../../Images/default-placeholder.png';
import { Link } from 'react-router-dom';
import { TextField } from '../../../../../node_modules/@material-ui/core';

const GroupAdminCard = (props) => {
    const { group_name, group_members, group_image, group_description, id, groupWarning, groupDelete, doWarn, doDelete } = props;
    return (
        <Card>
                    <Link to={`/groups/${id}`} style={{textDecoration: 'none'}}>
                        {/*Displaying the group_name and group_description from props */}
                        <CardHeader
                        avatar={<Avatar src={group_image || placeholderImage} alt={group_name}  />
                        }
                        title={group_name}
                        subheader={group_description}
                    />
                    {group_name}
                    <CardMedia 
                        image={group_image || placeholderImage}
                        title={group_name}
                    />
                    {group_members && group_members.length && group_members.map((member, i) => <Chip key={i}
                                                                                                avatar={<Avatar src={member.profile_picture}/>}
                                                                                                label={member.email}
                                                                                                onDelete={() => console.log('member--------', member)}
                                                                                                />)}
                    <CardContent>
                        <Typography component='p'>{group_description}</Typography>
                    </CardContent>
                    </Link>
                    <Button variant='outlined' onClick={() => props.warnGroupAdmin()}>Send Warning</Button>
                    <TextField
                    required
                    style={{display: doWarn ? 'inline-block' : 'none'}}
                    label="Group Warning"
                    onChange={e => props.handleGroupWarning(e.target.value)}
                    value={groupWarning}
                    margin="normal"
                    />
                    <Button variant='outlined' onClick={() => props.deleteGroup()}>Delete</Button>
                    <TextField
                    required
                    style={{display: doDelete ? 'inline-block' : 'none'}}
                    label="Reason Delete Group"
                    onChange={e => props.handleGroupDelete(e.target.value)}
                    value={groupDelete}
                    margin="normal"
                    />
        </Card>
    );
};

export default GroupAdminCard;