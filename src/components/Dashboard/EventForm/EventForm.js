import React from 'react';
import TextField from '@material-ui/core/TextField';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';



const EventForm = (props) => {
    const { eventName, eventTopic, eventImage, eventDate, eventLocation, currentEventAttendeeSelected, eventAttendeeList } = props;
    return (
        <div>
            <h4>Create Event</h4>
            <form>
                <TextField
                required
                id="name"
                label="Event Name"
                onChange={e => props.handleName(e.target.value)}
                value={eventName}
                margin="normal"
                />
                <TextField
                required
                id="topic"
                label="Event Topic"
                onChange={e => props.handleTopic(e.target.value)}
                value={eventTopic}
                margin="normal"
                />          
                <TextField
                required
                id="event-image"
                type="file"
                label="Upload Image"
                onChange={e => props.eventImageUpload(e.target.files)}
                value={eventImage}
                margin="normal"
                />      
                <TextField
                required
                id="date"
                type="date"
                onChange={e => props.handleDate(e.target.value)}
                value={eventDate}
                margin="normal"
                />
                <TextField
                required
                id="location"
                label="Event Location"
                onChange={e => props.handleLocation(e.target.value)}
                value={eventLocation}
                margin="normal"
                />
                <TextField
                required
                id="attendees"
                label="Current Attendee"
                onChange={e => props.handleCurrentAttendee(e.target.value)}
                value={currentEventAttendeeSelected}
                margin="normal"
                />
                <datalist>
                    {eventAttendeeList && eventAttendeeList.map(attendee => <option>{attendee}</option>)}
                </datalist>
                <Button variant='outlined' color='primary' onClick={() => props.create()}>
                    Create Event 
                </Button>
            </form>    
            <div className='attendee-list'>
                <h3>Attendees</h3>
                {eventAttendeeList && eventAttendeeList.map(attendee => <p>{attendee}</p>)}
            </div>
        </div>
    );
};

export default EventForm;