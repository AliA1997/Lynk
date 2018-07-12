import React, { Component } from 'react';
import EditEvent from '../EditEvent/EditEvent';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './EventCard.css';


const CLOUDINARY_URL='https://api.cloudinary.com/v1_1/lynk00/image/upload';

export default class EventCard  extends Component {
    constructor(){
        super();
        this.state = {
            doEdit: false,
            editEventName: '',
            editEventTopic: '',
            editEventImage: '',
            editEventDate: '',
            editEventLocation: '',
            editEventAttendeeList: [],
            
        }
    }

    handleEditName = (val) => {
        this.setState({editEventName: val});
    }

    handleEditTopic = (val) => {
        this.setState({editEventTopic: val});
    }

    handleEditImage = (files) => {
        //axios call to server to request hashed signature
        axios.get('/api/upload').then(response => {
        
        //form data for signed uploads
        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
        formData.append("timestamp", response.data.payload.timestamp)
        formData.append("file", files[0]);

        for(var pair of formData.entries()){
            console.log(pair);
        }
        //axios call to cloudinary using the URL set at top
            axios.post(CLOUDINARY_URL, formData).then(response => {
            //Setting state with the secure_url
                this.setState({
                    editEventImage: response.data.secure_url
                })
            }).catch(err => console.log("Cloudinary Database Error-----------", err));
        }).catch(err => console.log("Get credential error-------", err))
    }

    handleEditDate = (val) => {
        this.setState({editEventDate: val});
    }

    handleEditEventLocation = (val) => {
        this.setState({editEventLocation: val});
    }

    handleEditEventAttendee = (val) => {
        this.setState({editEventAttendeeList: val})
    }

    deleteEvent = (id) => {
        if(window.confirm('Do you want to delete this event?')){
            axios.delete(`/api/events/${id}`).then(res 
            => {
                // this.setState({events: res.data.events});
            }).catch(err => console.log('Delete Event Error----------', err));
        }
    }

    editEvent = (id) => {
        //Destructure the doEdit and the editEventName, editEventTopic, editEventDate, editEventLocation, editEventImage from the state.
        const { doEdit, editEventName, editEventTopic, editEventDate, editEventLocation, editEventImage } = this.state;
        
        if(doEdit && (editEventName || editEventTopic ||editEventDate || editEventLocation || editEventImage )){
            axios.put(`/api/events/${id}`).then(res => {
                // this.setState({events: res.data.events});
            }).catch(err => console.log('Edit Event Error----------', err));
        } else{
            this.setState({doEdit: !this.state.doEdit});
        }
    }

    addAttendees = (id, member) => {
        axios.patch(`/api/event/${id}/add_attendee`, member).then(res => {
            this.setState({events: res.data.events});
        }).catch(err => console.log('Add Attendee Error------------', err));
    }

    removeAttendees = (id, member) => {
        axios.patch(`/api/event/${id}/remove_attendee`, member).then(res => {
            this.setState({events: res.data.events});
        }).catch(err => console.log('Remove Member Error---------', err));
    }

    render() {
        const{event_name, event_topic, event_date, event_location, event_attendee_list, event_image, event_admin} = this.props;
        const { doEdit, editEventName, editEventTopic, editEventDate, editEventLocation, editEventAttendeeList, editEventImage, editEventImage} = this.state;
        return (
            <div>
                <div>
                    {/* Displaying the event_image, event_name, event_topic, event_date, event_location from props*/}
                    <Avatar src= {event_image}/>
                    <p>Event Name: </p>
                    {event_name}
                    <p>Event Topic:</p>
                    {event_topic}
                    <p>Event Date:</p>
                    {event_date}
                    <p>Event Location</p>
                    {event_location}
                </div>
                {this.props.isDashboard && <Button variant='outlined' onClick={() => this.editEvent(id)}>Edit</Button>}

                {this.props.isDashboard && <Button variant='outlined' onClick={() => this.deleteEvent(id)}>Delete</Button>}

                <div style={{display: doEdit ? 'inline-block' : 'none'}}>
                    <EditEvent editEvent={this.editEvent} 
                    handleName={this.handleEditName}
                    handleTopic={this.handleEditTopic}
                    handleDate={this.handleEditDate}
                    handleLocation={this.handleEditLocation}
                    handleImage={this.handleEditImage}
                    {...this.state}
                    eventName={event_name}
                    eventTopic={event_topic}
                    eventDate={event_date}
                    eventLocation={event_location}
                    eventAttendee={event_attendee_list}/>

                </div>
            </div>
        
        );
    }
}

EventCard.defaultProps = {
    isDashboard: false,
}