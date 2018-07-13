import React, { Component } from 'react';
import Search from '../Global/Search/Search';
import EventCard from '../Events/EventCard/EventCard';
import axios from 'axios';

export default class EventSearch extends Component {
    constructor() {
        super();
        this.state = {
            defaultEvents: [],
            searchEvents: []
        }
    }
    componentDidMount() {
        axios.get('/api/events/search')
        .then(res => {
            //I have 2 arrays on with the default events. and search events. 
            this.setState({defaultEvents: res.data.events, searchEvents: res.data.events});
        }).catch(err => console.log('Event Search-------------------------', err));
    }
    handleSearch = (val) => {
        //Copy the array.
        let copyOfArr = this.state.defaultEvents.slice();
        //Filter the array.
        copyOfArr = copyOfArr.filter(event => event === val);
        //Set the state of the searchEvents.
        this.setState({searchEvents: copyOfArr});
    }
    render() {
        //Can set default values when destructuring, using the assignment operator(=) and the value.
        const { defaultEvents = [], searchEvents = [] } = this.state;
        return (
            <div>
                <div>
                    <h2>Search Events</h2>
                    <Search type='Events' handleChange={this.handleSearch}/>
                    {searchEvents && searchEvents.length ? searchEvents.map(event => <EventCard {...event} />) 
                    : defaultEvents.map(event => <EventCard {...event} />)}
                </div>
            </div>
        );
    }
}