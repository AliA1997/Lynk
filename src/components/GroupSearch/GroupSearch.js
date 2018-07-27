import React, { Component } from 'react';
import Search from '../Global/Search/Search';
import GroupCard from '../Groups/GroupCard/GroupCard';
import Loading from '../Global/Loading/Loading';
import axios from 'axios';

export default class GroupSearch extends Component {
    constructor() {
        super();
        this.state = {
            // searchString: '',
            defaultGroups: [],
            searchGroups: [],
            loading: true
        }
    }
    componentDidMount() {
        axios.get('/api/groups/search')
        .then(res => {
            if(res.data.groups) {
                //I have 2 arrays on with the default events. and search events. 
                this.setState({defaultGroups: res.data.groups, searchGroups: res.data.groups, loading: false});
            }
        }).catch(err => console.log('Event Search-------------------------', err));
    }
    handleSearch = (val) => {
        //Copy the array
        let copyOfArr = this.state.defaultGroups.slice();
        console.log('copyOfArr----------------------', copyOfArr);
        //Filter the array.
        copyOfArr = copyOfArr.filter(group => group.group_name.toLowerCase().includes(val));
        ///set the state.
        this.setState({searchGroups: copyOfArr});
    }
    render() {
        console.log('defaultGroups----------', this.state.defaultGroups);
        console.log('searchGroups----------', this.state.searchGroups);
        //Can set a default value when destructuring properties from object, by using the assignment operator (=)
        const { defaultGroups, searchGroups, loading } = this.state;
        if(!loading){
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
        } else{
            return <Loading/>
        }
    }
}