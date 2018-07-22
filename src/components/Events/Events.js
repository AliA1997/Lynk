import React, { Component } from 'react';
import EventCard from './EventCard/EventCard';
import Loading from '../Global/Loading/Loading';
//Material-ui Components
import Typography from '@material-ui/core/Typography';
//Connect the componenet to redux
import { connect } from 'react-redux';
import axios from 'axios';

class Events extends Component {
    constructor(){
        super();

        this.state={
            events: [],
            loading: true
        }
    }


    componentDidMount() {
        //Axios call setting state with events array
        //If there is no isDashboard prop.
        if(!this.props.isDashboard){
            axios.get('/api/events').then(res => {
                //Gets all default groups
                this.setState({
                    events: res.data.events,
                    loading: false
                });
            }).catch(err => console.log('Get Events Error--------', err));
        } else if(this.props.isDashboard && this.props.eventsUserAdmin) {
            const { user } = this.props;
            let arr = [];
            axios.get(`/api/events/admin/${user.id}`).then(res => {
                //Get all events that the user is in charge of.
                for(let i = 0; i < 5; i++) {
                    if(res.data.events[i]) arr.push(res.data.events[i]);
                }
                this.setState({
                    events: arr,
                    loading: false
                });

            }).catch(err => console.log('Get User Admin Events Error-------------', err));
        } else if(this.props.isDashboard && this.props.eventsUserPartOf) {
            const { user } = this.props;
            let arr = [];
            axios.get(`/api/events/user/${user.id}`).then(res => {
                //Get all events that the user is in charge of.
                for(let i = 0; i < 5; i++) {
                    if(res.data.events[i]) arr.push(res.data.events[i]);
                }
                this.setState({
                    events: arr,
                    loading: false
                });
            }).catch(err => console.log('Get User Admin Events Error-------------', err));
        }
      
    }


    render() {
        //Destructuring groups from this.state
        const{ events, loading } = this.state;
        if(!loading){
            
            return (
                <div>
                    <div>
                        {/* Mapping over events array and returning EventCard with spread operator passing each property of events*/}
                        {events.length ? events.map((event, i) => <EventCard key={i} {...event}
                        isDashboard={this.props.isDashboard}/> ) : <Typography>Sorry they are no events........ &#x1F622;</Typography>}
                    </div>
                </div>
            );
        } else{
            return <Loading/>
        }
    }
}

//Define the default props.
Events.defaultProps = {
    isDashboard: false,
    eventsUserAdmin: false,
    eventsUserPartOf: false
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Events);