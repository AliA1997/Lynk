import React, { Component } from 'react';
import UserCard from './UserCard/UserCard';
import axios from 'axios';

export default class UserCardContainer extends Component {
    constructor() {
        super();
        this.state = {
            userWarning: '',
            deleteUser: '',
            doWarnUser: false,
            doDeleteUser: false,
        }
    }
    sendUserWarning = (id, email, username) => {
        console.log('id, email, username', `${id}, ${email}, ${username}`)
        //Destruct the doWarnUser and userWarning from state.
        const { doWarnUser, userWarning } = this.state;
        if(doWarnUser && userWarning) {
            axios.post('/api/admin/warning/user', {id, email, username, reason: userWarning})
            .then(res => {
                this.setState({doWarnUser: false});
                alert(res.data.message);
            }).catch(err => console.log('Delete User Database Error----------------', err));
        } else {
            this.setState({doWarnUser: !this.state.doWarnUser});
        }
    }
    sendUserDelete = (id, email, username) => {
        //Destruct the doDeleteUser and deleteUser from state.
        const { doDeleteUser, deleteUser } = this.state;
        if(doDeleteUser && deleteUser) {
            axios.delete(`/api/admin/users/${id}`, {
                data: { id, email, username, reason: deleteUser }
            })
            .then(res => {
                this.props.reRenderUsers(res.data.users);
                this.setState({users: res.data.users, doDeleteUser: false})
                alert(res.data.message);
            }).catch(err => console.log('Delete User Database Error----------------', err));
        } else {
            this.setState({doDeleteUser: !this.state.doDeleteUser});
        }
    }
    handleUserWarning = (val) => {
        this.setState({userWarning: val});
    }
    handleUserDelete = (val) => {
        this.setState({deleteUser: val});
    }
    render() {
        return (
          <UserCard {...this.props} {...this.state} handleUserWarning={this.handleUserWarning} 
          handleUserDelete={this.handleUserDelete} sendWarning={this.sendUserWarning} deleteUser={this.sendUserDelete} />  
        );
    }
}