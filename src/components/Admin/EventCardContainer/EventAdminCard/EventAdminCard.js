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
    const { event_name, event_attendee_list, event_image, event_topic, group_name, id, eventWarning, eventDelete, doWarn, doDelete } = props;
    return (
        <Card>
                    <Link to={`/events/${id}`} style={{textDecoration: 'none'}}>
                        {/*Displaying the event_name and event_description from props */}
                        <CardHeader
                        avatar={<Avatar src={event_image || placeholderImage} alt={event_name}  />
                        }
                        title={event_name}
                        subheader={group_name}
                    />
                    {event_name}
                    <CardMedia 
                        image={event_image || placeholderImage}
                        title={event_name}
                    />
                    {event_attendee_list && event_attendee_list.length && event_attendee_list.map((attendee, i) => <Chip key={i}
                                                                                                avatar={<Avatar src={attendee.profile_picture}/>}
                                                                                                label={attendee.email}
                                                                                                onDelete={() => console.log('attendee--------', attendee)}
                                                                                                />)}
                    <CardContent>
                        <Typography>{event_topic}</Typography>
                    </CardContent>
                    </Link>
                    <Button variant='outlined' onClick={() => props.warnGroupAdmin()}>Send Warning</Button>
                    <TextField
                    required
                    style={{display: doWarn ? 'inline-block' : 'none'}}
                    label="Event Warning"
                    onChange={e => props.handleEventWarning(e.target.value)}
                    value={eventWarning}
                    margin="normal"
                    />
                    <Button variant='outlined' onClick={() => props.deleteEvent()}>Delete</Button>
                    <TextField
                    required
                    style={{display: doDelete ? 'inline-block' : 'none'}}
                    label="Reason Delete Event"
                    onChange={e => props.handleEventDelete(e.target.value)}
                    value={eventDelete}
                    margin="normal"
                    />
        </Card>
    );
};

export default GroupAdminCard;