import React, { Component } from 'react';
import GroupCard from './GroupCard/GroupCard';

export default class Groups extends Component {
    constructor(){
        super();

        this.state= {
            groups: []
        }
    }

    componentDidMount() {
        //Axios call setting state with groups array
        axios.get('/api/groups').then(res => {
            this.setState({groups: res.data.groups})
        })
    }


    render() {
        //Destructuring groups from this.state
        const{ groups } = this.state;
        return (
            <div> 
                <h1>Groups</h1>
                <div>
            {/* Mapping over groups array and returning GroupCard with spread operator passing each property of group*/}
                    {groups.length && groups.map(group => <GroupCard {...group}/>)}
                </div>
            </div>
        );
    }
}