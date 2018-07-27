import React, { Component } from 'react';
import EventAdminCard from './EventAdminCard/EventAdminCard';
import axios from 'axios';


export default class GroupCardContainer extends Component {
    constructor() {
        super();
        this.state = {
            eventWarning: '',
            eventDelete: '',
            doWarn: false,
            doDelete: false
        }
    }
    warnEventAdmin = () => {
        const { doWarn, eventWarning } = this.state;
        const { event_name, event_admin } = this.props;
        if(doWarn && eventWarning) {
            axios.post(`/api/admin/warning/events/${event_admin}`, {event_name, reason: eventWarning}).then(res => {
                this.setState({doWarn: false, eventWarning: ''})
                alert("Warning Sent!");
            }).catch(err => console.log('Axios Send Event Warning ERror---------', err));
        } else {
            this.setState({doWarn: !this.state.doWarn});
        }
    }
    deleteEvent = () => {
        const { doDelete, eventDelete } = this.state;
        const { group_id, id } = this.props;
        if(doDelete && eventDelete) {
            console.log('Hit if statement');
            if(window.confirm('You sure you want to delete this event!')) {
                axios.delete(`/api/admin/events/${group_id}`, {
                    data: {reason: eventDelete, event_id: id}
                }).then(res => {
                    console.log(id);
                    console.log('Hit promise');
                    this.props.reRenderEvents(res.data.events);
                    this.setState({doDelete: false, eventDelete: ''});
                    alert("event deleted!");
                }).catch(err => console.log('Delete Event Database Error--------' ,err));
            }
        } else {
            this.setState({doDelete: !this.state.doDelete});
        }
    }
    handleEventWarning = (val) => {
        this.setState({eventWarning: val});
    }
    handleEventDelete = (val) => {
        this.setState({eventDelete: val});
    }
    render() {
        return (
            <EventAdminCard {...this.props} {...this.state} handleEventWarning={this.handleEventWarning} 
            deleteEvent={this.deleteEvent} warnEventAdmin={this.warnEventAdmin} handleEventDelete={this.handleEventDelete}/>
        );
    }
}