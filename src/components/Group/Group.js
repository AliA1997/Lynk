import React, { Component } from 'react';
import axios from 'axios';

export default class Group extends Component {
    constructor() {
        super();
        this.state = {
            currentHouse: ''
        }
    }
    componentDidMount() {
        axios.get(`/api/group/${this.props.match.params.id}`)
        .then(res => {
            this.setState({currentHouse: res.data.house});
        }).catch(err => console.log('Get Individual House Error-----------', err));
    }
    render() {
        const { group_name, group_description, group_image, group_members, username } = this.state.currentHouse;
        return (
            <div>
                <div>
                    <h3>Group Name:</h3>
                    <h3>{group_name}</h3>
                    <h3>Operated by {username}</h3>
                    <div className='group-description-div'>
                        <p>{group_description}</p>
                    </div>
                    <div className='group-members-div'>
                        {group_members.length && group_members.map(member => <p>{member}</p>)}
                    </div>
                </div>
            </div>
        );
    }
}