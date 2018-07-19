import React, { Component } from 'react';
import EventForm from './EventForm/EventForm';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import './CreateEvent.css';

const CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/lynk00/image/upload';


class Create_Event extends Component {
    constructor() {
        super();
        this.state = {
            eventName: '',
            eventTopic: '',
            eventDate: new Date(),
            eventImage: '',
            eventLocation: '',
            currentEventAttendeeSelected: '',
            userGroups: '',
            groupSelected: '',
            eventAttendeeList: []
        }
    }
    componentDidMount() {
        const { user } = this.props;
        console.log('user-----------', user);
        if(user) {
            axios.get(`/api/groups/admin/${user.id}`).then(res => {
                console.log('res.data.groups------------', res.data.groups);
                this.setState({userGroups: res.data.groups});
            }).catch(err => console.log('Get Groups Error----------', err));
        }
    }

    handleGroupSelect = (val) => {
        const { groupSelected, userGroups } = this.state;
        const filteredGroup = userGroups.filter(group => group.group_name === val)[0];
        this.setState({groupSelected: filteredGroup.id});
    }
    handleEventName = (val) => {
        //Handle changes in the event name input field
        this.setState({eventName: val})        
    }
    handleEventTopic = (val) => {
        //Handle changes in the event topic input field
        this.setState({eventTopic: val})        
    }
    //Functions used for clicked next and previous for date, 
    //and therefore needed to binded, so become arrow functions.
    //When Date is clicked
    onDateClick = date => {
        this.setState({eventDate: date});
        console.log('date--------------',  date);
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
        //Copy the members array
        const copyOfGroupMembers = this.state.groupSelected.group_members.slice();
        //Copy the array, so you can add to it.
        const copyOfArr = this.state.eventAttendeeList.slice();
        //Filtered Member 
        const groupMemberSelected = copyOfGroupMembers.filter(member => member.username === val)[0];
        //Push to the copy of the array.
        copyOfArr.push(groupMemberSelected);
        this.setState({eventAttendeeList: copyOfArr});
    }
    removeAttendee = (val) => {
        //Copy array, so you can remove from it.
        let copyOfArr = this.state.eventAttendeeList.slice();
        //Get the index of the value to be remove.
        let removeGroupMemberIndex = copyOfArr.findIndex(attendee => attendee.username === val);
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
        const { eventName, eventTopic, eventImage, eventDate, eventLocation, eventAttendeeList, groupSelected } = this.state;
        const newEvent = { eventName, eventTopic, eventImage, eventDate, eventLocation, eventAttendeeList, groupId: +groupSelected };
        axios.post('/api/events', newEvent).then(res => {
            ///Redirect after creating event.
            this.props.history.push('/dashboard');
            alert('Event Created!!!');
        }).catch(err => console.log(err, 'Create Event Database Error-----------------'));
    }
    render() {
        //Destruct the event props from the props.
        const { currentMemberSelected, eventName, eventTopic, eventImage, eventDate, eventLocation, userGroups, groupSelected, 
             currentEventAttendeeSelected, eventAttendeeList } = this.state;
        return (
            <div>
                <div className='create-event-form'>
                        <EventForm userGroups={userGroups} groupSelected={groupSelected} handleSelect={this.handleGroupSelect} remove={this.removeAttendee} add={this.addAttendee}
                        eventImage={eventImage} eventImageUpload={this.eventImageUpload} eventName={eventName} eventDate={eventDate} eventTopic={eventTopic} 
                        eventLocation={eventLocation} currentMemberSelected={currentMemberSelected} currentEventAttendee={currentEventAttendeeSelected} onDateClick={this.onDateClick}
                        eventMembers={eventAttendeeList} create={this.createEvent} handleName={this.handleEventName} handleTopic={this.handleEventTopic}
                        handleDate={this.handleEventDate} handleLocation={this.handleEventLocation} handleCurrentAttendee={this.handleCurrentEventAttendee} />

                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default withRouter(connect(mapStateToProps)(Create_Event));