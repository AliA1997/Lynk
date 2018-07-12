import React, { Component } from 'react';
import EventForm from './EventForm/EventForm';
import axios from 'axios';
import './CreateEvent.css';

const CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/lynk00/image/upload';

export default class Create_Event extends Component {
    constructor() {
        super();
        this.state = {
            eventName: '',
            eventTopic: '',
            eventDate: '',
            eventImage: '',
            eventLocation: '',
            currentEventAttendeeSelected: '',
            eventAttendeeList: []
        }
    }
    handleEventName = (val) => {
        //Handle changes in the event name input field
        this.setState({eventName: val})        
    }
    handleEventTopic = (val) => {
        //Handle changes in the event topic input field
        this.setState({eventTopic: val})        
    }
    handleEventDate = (val) => {
        //Handle changes in the event date input field
        this.setState({eventDate: val})        
    }
    handleEventLocation = (val) => {
        //Handle changes in the event location input field
        this.setState({eventLocation: val})        
    }
    handleCurrentEventAttendee = (val) => {
        //Handle changes in the current attendee input field
        this.setState({currentEventAttendeeSelected: val})        
    }
    
    addAttendee = (val) => {
        //Copy the array, so you can add to it.
        let copyOfArr = this.state.eventAttendeeList.slice();
        //Push to the copy of the array.
        copyOfArr.push(val);
        this.setState({eventAttendeeList: copyOfArr});
    }
    removeAttendee = (val) => {
        //Copy array, so you can remove from it.
        let copyOfArr = this.state.eventAttendeeList.slice();
        //Get the index of the value to be remove.
        let removeGroupMemberIndex = copyOfArr.findIndex(attendee => attendee === val);
        //Remove value from array based on the index.
        copyOfArr.splice(removeGroupMemberIndex, 1);
        //Then set the state of the group members to the copy of array.
        this.setState({eventAttendeeList: copyOfArr});
    }
    eventImageUpload = (files) => {

            //axios call to server to request hashed signature
            console.log('file', files)
            console.log('files', files[0])
            axios.get('/api/upload').then(response => {
            console.log(response.data)
            
            //form data for signed uploads
    
            let formData = new FormData();
            formData.append("signature", response.data.payload.signature)
            formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
            formData.append("timestamp", response.data.payload.timestamp)
            formData.append("file", files[0]);
    
            for(var pair of formData.entries()) {
                console.log(pair); 
             }
             console.log('formData---------------', formData);
            //axios call to cloudinary using the URL set at top 
                axios.post(CLOUDINARY_URL, formData).then(response => {
                    console.log(response.data);
    
                    // Setting state with the secure_url
                    this.setState({
                        eventImage: response.data.secure_url
                    })
                }).catch( err => console.log("CLoudinary Database Errorr------------", err));
            }).catch(err => console.log("get credentail error-----------", err));
    }
    
    createEvent = () => {
        ///Destruct the eventName, eventDescription, eventDate, eventLocation, and eventAttendeeeList from the state.
        const { eventName, eventTopic, eventImage, eventDate, eventLocation, eventAttendeeList } = this.state;
        const newEvent = { eventName, eventTopic, eventImage, eventDate, eventLocation, eventAttendeeList };
        axios.post('/api/events', newEvent).then(res => {
            alert('Event Created!!!');
        }).catch(err => console.log(err, 'Create Event Database Error-----------------'));
    }
    render() {
        //Destruct the event props from the props.
        const { currentMemberSelected, eventName, eventTopic, eventImage, eventDate, eventLocation, currentEventAttendeeSelected, eventAttendeeList } = this.state;
        return (
            <div>
                <div className='create-event-form'>
                        <EventForm eventImage={eventImage} eventImageUpload={this.eventImageUpload} eventName={eventName} eventDate={eventDate} eventTopic={eventTopic} 
                        eventLocation={eventLocation} currentMemberSelected={currentMemberSelected} currentEventAttendee={currentEventAttendeeSelected} 
                        eventMembers={eventAttendeeList} create={this.createEvent} handleName={this.handleEventName} handleTopic={this.handleEventTopic}
                        handleDate={this.handleEventDate} handleLocation={this.handleEventLocation} handleCurrentAttendee={this.handleCurrentEventAttendee} />

                </div>
            </div>
        );
    }
}