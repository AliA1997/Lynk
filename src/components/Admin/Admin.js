import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import component you are gonna use
import UserCardContainer from './UserCardContainer/UserCardContainer';
import Loading from '../Global/Loading/Loading';
///Iimport Material-ui componnents
import Typography from '@material-ui/core/Typography';
//Import axios to perform axios calls to backend.
import axios from 'axios';
import GroupCardContainer from './GroupCardContainer/GroupCardContainer';
import EventCardContainer from './EventCardContainer/EventCardContainer';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
    }
    componentDidMount() {
        const { user } = this.props; 
        if(user.is_admin) {
            const usersAxiosCall = axios.get('/api/admin/users');
            const groupAxiosCall = axios.get('/api/admin/groups');
            const eventAxiosCall = axios.get('/api/admin/events');
            Promise.all([usersAxiosCall, groupAxiosCall, eventAxiosCall]).then(res => {
                const { users, groups, events } = this.state;
                //Set the users state to res.data.users
                this.setState({users: res[0].data.users, groups: res[1].data.groups, events: res[2].data.events,loading: false});
                console.log('users---------', users);
                console.log('groups---------', groups);
                console.log('events-----------', events);
            }).catch(err => console.log('Users Axios Error--------', err));
        } else {
             this.props.history.push('/');
        }
    }
   reRenderUsers = (users) => {
       this.setState({users});
   }
   reRenderGroups = (groups) => {
    // const roupAxiosCall = axios.get('/api/admin/groups');
       this.setState({groups});
   }
   reRenderEvents = (events) => {
    // const roupAxiosCall = axios.get('/api/admin/events');
       this.setState({events});
   }
    render() {
        //Destruct the users from teh state.
        const { users, groups, events, loading } = this.state;
        if(!loading) {
            return (
                <div>
                    <Typography>Admin</Typography>
                    <div>
                    </div>
                    <div>
                        <Typography>Users</Typography>
                        {users && users.length ? users.map((user, i) => <UserCardContainer key={i} {...user} reRenderUsers={this.reRenderUsers}/>) : null}
                    </div>
                    <div>
                        <Typography>Groups</Typography>
                        {groups && groups.length ? groups.map(group => <GroupCardContainer key={group.id} {...group} reRenderGroups={this.reRenderGroups} />) : null}
                    </div>
                    <div>
                        <Typography>Events</Typography>
                        {events && events.length ? events.map(event => <EventCardContainer key={event.id} {...event} reRenderEvents={this.reRenderEvents} />) : null}
                    </div>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user 
    }
}

export default withRouter(connect(mapStateToProps)(Admin));