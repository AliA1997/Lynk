import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import component you are gonna use
import UserCard from './UserCard/UserCard';
///Iimport Material-ui componnents
import Typography from '@material-ui/core/Typography';
//Import axios to perform axios calls to backend.
import axios from 'axios';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            userWarning: '',
            deleteUser: '',
            doWarnUser: false,
            doDeleteUser: false,
        }
    }
    componentDidMount() {
        axios.get('/api/admin/users').then(res => {
            const { users } = this.state;
            console.log('users---------', users);
            //Set the users state to res.data.users
            this.setState({users: res.data.users});
        }).catch(err => console.log('Users Axios Error--------', err));
    }
    handleUserWarning(id, email, username) {
        //Destruct the doWarnUser and userWarning from state.
        const { doWarnUser, userWarning } = this.state;
        if(doWarnUser && userWarning) {
            axios.post('/api/admin/warning/user', {id, email, username, reason: userWarning})
            .then(res => {
                alert(res.data.message);
            }).catch(err => console.log('Delete User Database Error----------------', err));
        } else {
            this.setState({doWarnUser: !this.state.doWarnUser});
        }
    }
    handleUserDelete(id, email, username) {
        //Destruct the doDeleteUser and deleteUser from state.
        const { doDeleteUser, deleteUser } = this.state;
        if(doDeleteUser && deleteUser) {
            axios.delete(`/api/admin/users/${id}`, {
                data: { id, email, username, reason: deleteUser }
            })
            .then(res => {
                alert(res.data.message);
            }).catch(err => console.log('Delete User Database Error----------------', err));
        } else {
            this.setState({doDeleteUser: !this.state.doDeleteUser});
        }
    }
    render() {
        //Destruct the users from teh state.
        const { users } = this.state;
        return (
            <div>
                <Typography>Admin</Typography>
                <div>
                </div>
                <div>
                    {users && users.length ? users.map(user => <UserCard key={user.id} {...user} {...this.state} />) : null}
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

export default withRouter(connect(mapStateToProps)(Admin));