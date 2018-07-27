import React, { Component } from 'react';
import GroupAdminCard from './GroupAdminCard/GroupAdminCard';
import axios from 'axios';


export default class GroupCardContainer extends Component {
    constructor() {
        super();
        this.state = {
            groupWarning: '',
            groupDelete: '',
            doWarn: false,
            doDelete: false
        }
    }
    warnGroupAdmin = () => {
        const { doWarn, groupWarning } = this.state;
        const { group_name, group_admin } = this.props;
        if(doWarn && groupWarning) {
            axios.post(`/api/admin/warning/groups/${group_admin}`, {group_name, reason: groupWarning}).then(res => {
                this.setState({doWarn: false, groupWarning: ''})
                alert("Warning Sent!");
            }).catch(err => console.log('Axios Send Group Warning ERror---------', err));
        } else {
            this.setState({doWarn: !this.state.doWarn});
        }
    }
    deleteGroup = () => {
        const { doDelete, groupDelete } = this.state;
        const { group_admin, id } = this.props;
        if(doDelete && groupDelete) {
            console.log('Hit if statement');
            if(window.confirm('You sure you want to delete this group!')) {
                axios.delete(`/api/admin/groups/${group_admin}`, {
                    data: {reason: groupDelete, group_id: id}
                }).then(res => {
                    console.log(id);
                    console.log('Hit promise');
                    this.props.reRenderGroups(res.data.groups);
                    this.setState({doDelete: false, groupDelete: ''});
                    alert("group deleted!");
                }).catch(err => console.log('Delete Group Database Error--------' ,err));
            }
        } else {
            this.setState({doDelete: !this.state.doDelete});
        }
    }
    handleGroupWarning = (val) => {
        this.setState({groupWarning: val});
    }
    handleGroupDelete = (val) => {
        this.setState({groupDelete: val});
    }
    render() {
        return (
            <GroupAdminCard {...this.props} {...this.state} handleGroupWarning={this.handleGroupWarning} 
            deleteGroup={this.deleteGroup} warnGroupAdmin={this.warnGroupAdmin} handleGroupDelete={this.handleGroupDelete}/>
        );
    }
}