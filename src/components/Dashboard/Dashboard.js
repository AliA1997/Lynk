import React, { Component } from 'react';
import EventForm from './EventForm/EventForm';
import GroupForm from './GroupForm/GroupForm';

///Dashboard components.
export default class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            groupName: '',
            groupDescription: '',
            currentMemberSelected: '',
            groupMembers: [],
            eventName: '',
            eventTopic: '',
            eventDate: '',
            eventLocation: '',
            currentEventAttendeeSelected: '',
            eventAttendeeList: [],
        }
    }
    handleGroupName = (val) => {
        //Handle changes in the group name input field
        this.setState({groupName: val})
    }
    handleGroupDescription = (val) => {
        //Handle changes in the group description input field
        this.setState({groupDescription: val})        
    }
    handleCurrentGroupMember = (val) => {
        //Handle changes in the current group member input field
        this.setState({currentMemberSelected: val})        
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
    addGroupMember = (val) => {
        //Copy of the array, so your add to it.
        let copyOfArr = this.state.groupMembers.slice();
        //Push to the copy of the array.
        copyOfArr.push(val);
        this.setState({groupMembers: copyOfArr});
    }
    removeGroupMember = (val) => {
        //Copy array, so you can remove from it.
        let copyOfArr = this.state.groupMembers.slice();
        //Get the index of the value to be remove.
        let removeGroupMemberIndex = copyOfArr.findIndex(member => member === val);
        //Remove value from array based on the index.
        copyOfArr.splice(removeGroupMemberIndex, 1);
        //Then set the state of the group members to the copy of array.
        this.setState({groupMembers: copyOfArr});
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
    createGroup = () => {
        ///Destruct the groupName, groupDescription, and groupMembers from the state.
        const { groupName, groupDescription, groupMembers } = this.state;
        //Assign a new group to the properties of the object.
        const newGroup = { groupName, groupDescription, groupMembers };
        axios.post('/api/groups', newGroup).then(res => {
            console.log('Group Created!!');
        }).catch(err => console.log(err, 'Create Group Database Error--------------'));
    }
    createEvent = () => {
        ///Destruct the eventName, eventDescription, eventDate, eventLocation, and eventAttendeeeList from the state.
        const { eventName, eventTopic, eventDate, eventLocation, eventAttendeeList } = this.state;
        const newEvent = { eventName, eventTopic, eventDate, eventLocation, eventAttendeeList };
        axios.post('/api/events', newEvent).then(res => {
            console.log('Event Created!!!');
        }).catch(err => console.log(err, 'Create Event Database Error-----------------'));
    }
    render() {
        return (
            <div>
                <h1>Dashboard</h1>
                <div>
                    <EventForm />
                    <GroupForm />
                </div>
                <div>
                    <button>

                    </button>
                </div>
            </div>
        );
    }
}

