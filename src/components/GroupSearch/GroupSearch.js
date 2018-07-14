import React, { Component } from 'react';
import Search from '../Global/Search/Search';
import GroupCard from '../Groups/GroupCard/GroupCard';
import axios from 'axios';

export default class GroupSearch extends Component {
    constructor() {
        super();
        this.state = {
            // searchString: '',
            defaultGroups: [],
            searchGroups: []
        }
    }
    componentDidMount() {
        axios.get('/api/groups/search')
        .then(res => {
            if(res.data.groups) {
                //I have 2 arrays on with the default events. and search events. 
                this.setState({defaultEvents: res.data.groups, searchgroups: res.data.events});
            }
        }).catch(err => console.log('Event Search-------------------------', err));
    }
    handleSearch = (val) => {
        //Copy the array
        let copyOfArr = this.state.defaultGroups.slice() ;
        //Filter the array.
        copyOfArr = copyOfArr.filter(group => group === val);
        ///set the state.
        this.setState({searchGroups: copyOfArr});
    }
    render() {
        console.log('defaultGroups----------', this.state.defaultGroups);
        console.log('searchGroups----------', this.state.searchGroups);
        //Can set a default value when destructuring properties from object, by using the assignment operator (=)
        const { defaultGroups, searchGroups } = this.state;
        return (
            <div>
                <div>
                    <h2>Search Groups</h2>
                    <Search type='Groups' handleChange={this.handleSearch} />
                    {searchGroups && searchGroups.length ? searchGroups.map((group, i) => <GroupCard key={i} {...group} />) 
                    : defaultGroups.map((group, i) => <GroupCard key={i} {...group} />)}
                </div>
            </div>
          
        );
    }
}