import React from 'react';
import Calendar from '../../Global/Calendar/Calendar';
//Import the Material UI elements to use.
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
//Import the react icon used for adding attendees to list.
import MdAdd from 'react-icons/lib/md/add';
//Import the css file
import './EventForm.css';


const EventForm = (props) => {
    //Destruct the props needed for the input fields.
    const { eventName, eventTopic, eventImage, eventDate, eventLocation, userGroups, groupSelected,
        currentEventAttendeeSelected, eventAttendeeList } = props;
    return (
        <div className='create-event-div'>
            <h4>Create Event</h4>
            <form className='create-event-form'>
                <select
                required 
                onChange={e => props.handleSelect(e.target.value)}
                >
                <option selected value={null}>Please Select your group.</option>
                {userGroups && userGroups.map((userGroup, i) => <option key={i}>{userGroup.group_name}</option>)}
                </select>
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
                <Avatar alt={eventName} src={eventImage} style={{height: '10em', width: '10em'}} />  
                <input type='file' placeholder='Event Image' onChange={e => props.eventImageUpload(e.target.files)} /> 
                <Calendar onDateClick={props.onDateClick} eventDate={eventDate} />
                <TextField
                required
                id="date"
                label="Event Date"
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
                {/*Map over the member of the current group selected.*/}
                <div className='select-attendees-div'>
                    <input type='text' list="members" placeholder="Add members" />
                    <datalist id='members'>
                        {groupSelected && groupSelected.group_members && groupSelected.group_members.length && 
                        groupSelected.group_members.map((groupMember, i) => <option key={i} value={groupMember.username}>{groupMember.username}</option>)}
                    </datalist>
                    <MdAdd className='add-icon' style={{fontSize: '2em'}} 
                    onClick={() => currentEventAttendeeSelected && props.add(currentEventAttendeeSelected)}/>
                </div>
                <Button variant='outlined' color='primary' onClick={() => props.create()}>
                    Create Event 
                </Button>
            </form>    
            <div className='attendee-list'>
                <h3>Attendees</h3>
                {eventAttendeeList && eventAttendeeList.map((attendee, i) => <div key={i}>
                                                                                <Chip
                                                                                avatar={<Avatar src={attendee.profile_picture}/>}
                                                                                label={attendee.username}
                                                                                onDelete={() => props.remove(attendee.username)} 
                                                                                />
                                                                             </div>)}
            </div>
        </div>
    );
};

export default EventForm;