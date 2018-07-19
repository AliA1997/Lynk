import React, { Component } from 'react';
import './Event.css';
import axios from 'axios';


export default class Event extends Component {
    constructor(){
        super();

        this.state = {
            currentEvent: ''
        }
    }

    componentDidMount() {
        axios.get(`/api/event/${this.props.match.params.id}`).then(res => {
            this.setState({currentEvent: res.data.event[0]});
            console.log(res.data.event, 'event data-------');
        }).catch(err => console.log('Get event error-------', err));
    }

    render() {
        const{ event_name, event_topic, event_image, event_date, event_location, event_attendee_list } = this.state.currentEvent;
        return (
            <div>
                <div>
                    <div>
                        <h3>Event Name:</h3>
                        <h3>{event_name}</h3>

                        <div>
                            <img src={event_image} alt={event_name}/>
                        </div>

                        <h3>Event Date:</h3>
                        <h3>{event_date}</h3>

                        <h3>Event Description:</h3>
                        <p>{event_topic}</p>

                        <h3>Event Location:</h3>
                        <h3>{event_location}</h3>

                        <div className='event-attendees'>
                            
                            {event_attendee_list && event_attendee_list.length && event_attendee_list.map(attendee => <p>{attendee}</p>)}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}