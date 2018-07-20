import React, { Component } from 'react';
import GroupChat from './GroupChat/GroupChat';
import axios from 'axios';

export default class Group extends Component {
    constructor() {
        super();
        this.state = {
            currentGroup: ''
        }
    }
    componentDidMount() {
        axios.get(`/api/group/${this.props.match.params.id}`)
        .then(res => {
            this.setState({currentGroup: res.data.group});
        }).catch(err => console.log('Get Individual Group Error-----------', err));
    }
    render() {
        const { group_name, group_description, group_image, group_members, username } = this.state.currentGroup;
        return (
            <div>
                <div>
                    <div>
                        <img src={group_image} alt={group_name} />
                    </div>
                    <h3>Group Name:</h3>
                    <h3>{group_name}</h3>
                    <h3>Operated by {username}</h3>
                    <div className='group-description-div'>
                        <p>{group_description}</p>
                    </div>
                    <div className='group-members-div'>
                        {group_members && group_members.length && group_members.map(member => <p>{member}</p>)}
                    </div>
                    <GroupChat />
                </div>
            </div>
        );
    }
}