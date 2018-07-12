import React, { Component } from 'react';
import GroupCard from './GroupCard/GroupCard';
import axios from 'axios';

export default class Groups extends Component {
    constructor(){
        super();

        this.state= {
            groups: []
        }
    }

    componentDidMount() {
        //Axios call setting state with groups array
        //If there is no isDashboard prop.
        if(!this.props.isDashboard) {
            axios.get('/api/groups').then(res => {
                //Gets all default groups
                this.setState({groups: res.data.groups})
            }).catch(err => console.log('Get Groups Error-------------', err));
        } else {
            axios.get(`/api/groups/admin/1`).then(res => {
                //Get all groups that the user is in charge of.
                this.setState({groups: res.data.groups});
            }).catch(err => console.log('Get User Admin Groups------------', err));
        }
    }


    render() {
        //Destructuring groups from this.state
        const{ groups } = this.state;
        return (
            <div> 
                {this.props.isDashboard ? <h1>Groups in Charge</h1> : <h1>Groups</h1>}
                <div>
            {/* Mapping over groups array and returning GroupCard with spread operator passing each property of group*/}
                    {groups.length && groups.map(group => <GroupCard {...group}/>)}
                </div>
            </div>
        );
    }
}
//Define the default props.
Groups.defaultProps = {
    isDashboard: false
}