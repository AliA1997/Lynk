import React, { Component } from 'react';
import EventCard from './EventCard/EventCard';
import axios from 'axios';

export default class Events extends Component {
    constructor(){
        super();

        this.state={
            events: []
        }
    }


    componentDidMount() {
        //Axios call setting state with events array
        //If there is no isDashboard prop.
        if(!this.props.isDashboard){
            axios.get('/api/events').then(res => {
                //Gets all default groups
                this.setState({events: res.data.groups})
            }).catch(err => console.log('Get Events Error--------', err));
        } else {
            axios.get(`/api/events`).then(res => {
                //Get all events that the user is in charge of.
                this.setState({events: res.data.events});
            }).catch(err => console.log('Get User Admin Events Error-------------', err));
        }
    }


    render() {
        //Destructuring groups from this.state
        const{ events } = this.state;
        return (
            <div>
                {this.props.isDashboard ? <h1>Events in Charge</h1> : <h1>Events</h1>}
                <div>
                    {/* Mapping over events array and returning EventCard with spread operator passing each property of events*/}
                    {events.length && groups.map((event, i) => <EventCard key={i} {...event}
                    isDashboard={this.props.isDashboard}/>
                    )}
                </div>
            </div>
        );
    }
}

//Define the default props.
Events.defaultProps = {
    isDashboard: false
}