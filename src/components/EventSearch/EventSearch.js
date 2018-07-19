import React, { Component } from 'react';
import Search from '../Global/Search/Search';
import EventCard from '../Events/EventCard/EventCard';
import Loading from '../Global/Loading/Loading';
import axios from 'axios';

export default class EventSearch extends Component {
    constructor() {
        super();
        this.state = {
            defaultEvents: [],
            searchEvents: [],
            loading: true
        }
    }
    componentDidMount() {
        axios.get('/api/events/search')
        .then(res => {
            if(res.data.events) {
                //I have 2 arrays on with the default events. and search events. 
                this.setState({defaultEvents: res.data.events, searchEvents: res.data.events, loading: false});
            }
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
        const { defaultEvents, searchEvents, loading } = this.state;
        if(!loading){
        return (
            <div>
                <div>
                    <h2>Search Events</h2>
                    <Search type='Events' handleChange={this.handleSearch}/>
                    {searchEvents && searchEvents.length ? searchEvents.map((event, i) => <EventCard key={i} {...event} />) 
                    : defaultEvents.map((event, i) => <EventCard key={i} {...event} />)}
                </div>
            </div>
            );
        } else{
            return <Loading/>
        }
    }
}