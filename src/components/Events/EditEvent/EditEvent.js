import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


const EditEvent = (props) => {
    //Destructuring eventName, editEventname, eventTopic, editEventTopic, eventImage, editEventImage, eventDate, editEventDtate, eventLocation, editEventLocation, eventAttendeeList, editEventAttendeeList to props
    const { eventName, editEventName, eventTopic, editEventTopic, eventImage, eventDate, editEventDate, eventLocation, editEventLocation } = props;
    return (
        <div>
            <form>
                <TextField 
                    required
                    id="name"
                    lable="Event Name"
                    onChange={e => props.handleName(e.target.value)}
                    value={editEventName}
                    placeholder={eventName}
                    autoComplete='name'
                    margin="normal"
                />
                <TextField
                    required
                    id="name"
                    label="Event Topic"
                    onChange={e => props.handleTopic(e.target.value)}
                    value={editEventTopic}
                    placeholder={eventTopic}
                    autoComplete='topic'
                    margin="normal"
                />
                <Avatar alt={eventName} src={eventImage} style={{height:'10em', width: '10em'}}/>
                <input type='file' placeholder={eventImage} onChange={e => props.handleImage(e.target.files)}
                required/>
                <TextField
                    required
                    id="name"
                    label="Event Date"
                    onChange={e => props.handleDate(e.target.value)}
                    value={editEventDate}
                    placeholder={eventDate}
                    autoComplete='date'
                    margin="normal"
                />
                <TextField
                    required
                    id="name"
                    label="Event Location"
                    onChange={e => props.handleLocation(e.target.value)}
                    value={editEventLocation}
                    placeholder={eventLocation}
                    autoComplete='location'
                    margin="normal"
                />
                {/* <TextField
                    required
                    id="name"
                    lable="Event Attendee List"
                    onChange={e => props.handleList
                    (e.target.value)}
                    value={editEventAttendeeList}
                    placeholder={eventAttendeeList}
                    margin="normal"
                /> */}
                
            </form>
        </div>
    )
}

export default EditEvent;