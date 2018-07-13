import React, { Component } from 'react';
import Search from '../Global/Search/Search';
import GroupCard from '../Groups/GroupCard/GroupCard';

export default class GroupSearch extends Component {
    constructor() {
        super();
        this.state = {
            // searchString: '',
            defaultGroups: [],
            searchGroups: []
        }
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
        //Can set a default value when destructuring properties from object, by using the assignment operator (=)
        const { defaultGroups = [], searchGroups = [] } = this.state;
        return (
            <div>
                <div>
                    <h2>Search Groups</h2>
                    <Search type='Groups' handleChange={this.handleSearch} />
                    {searchGroups && searchGroups.length ? searchGroups.map(group => <GroupCard {...group} />) 
                    : defaultGroups.map(group => <GroupCard {...group} />)}
                </div>
            </div>
          
        );
    }
}