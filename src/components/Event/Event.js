import React, { Component } from 'react';
import Calender from '../Global/Calendar/Calendar';
// import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import placeholderImage from '../../Images/default-placeholder.png';
import Loading from '../Global/Loading/Loading';
import axios from 'axios';
import './Event.css';


export default class Event extends Component {
    constructor(){
        super();

        this.state = {
            currentEvent: '', 
            lat: null,
            loading: true,
            long: null
        }
    }

    componentDidMount() {
        console.log('this.props.match.params.id-------------', this.props.match.params.id)
        axios.get(`/api/event/${this.props.match.params.id}`).then(res => {
            this.setState({currentEvent: res.data.event[0]});
            console.log(res.data.event, 'event data-------');
            let locations = this.state.currentEvent.event_location.split(', ')
            axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=+${locations[0]},+${locations[1]}&key=${process.env.REACT_APP_GOOGLE_KEY}`)
            .then(res => { 
                if(res.data.results.length) {
                    console.log('if statement hti----------');
                    this.setState({
                        lat: res.data.results[0].geometry.location.lat,
                        long: res.data.results[0].geometry.location.lng,
                        loading: false
                    });
                    console.log('location info------------', res.data.results[0].geometry.location.lat, res.data.results[0].geometry.location.lng)
                } else {
                    this.setState({loading: false});
                }
            }).catch(err => console.log('Get event location error----------', err))
        }).catch(err => console.log('Get event error-------', err));

    }

    render() {
        const{ event_name, event_topic, event_image, event_date, event_location, event_attendee_list, group_name, group_image } = this.state.currentEvent;
        const{ lat, long, loading } = this.state
        console.log(lat, long)
        if(!loading) {
            return (
                <div className='event-page-container-div'>
                    <div className='event-page-div'>
                        <h3>Event Name: {event_name && event_name}</h3>

                        <div className='event-image-div'>
                            <img src={event_image || placeholderImage} alt={event_name} className='event-page-image'/>
                        </div>
                        <h3> Group that operates this event: <Chip 
                                                                avatar={<Avatar src={group_image} alt={group_name} />}
                                                                label={group_name}/></h3>
                        {/* <Button variant="outlined" color="primary">Not in group?</Button> */}
                        <h3>Event Date: {event_date}</h3>

                        <h3>Event Topic: {event_topic} </h3>

                        <h3>Event Location:</h3>
                        <h3>{event_location}</h3>
                        {/* <Calender eventDate={event_date} /> */}
                        <div className='event-attendees'>
                            
                            {event_attendee_list && event_attendee_list.length && event_attendee_list.map(attendee => <p>{attendee}</p>)}
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}