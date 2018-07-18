import React, { Component } from 'react';
import GroupCard from './GroupCard/GroupCard';
import axios from 'axios';
import { connect } from 'react-redux';

class Groups extends Component {
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
            //Destructiong the user
            const { user } = this.props;
            axios.get(`/api/groups/admin/${user.id}`).then(res => {
                //Get all groups that the user is in charge of.
                this.setState({groups: res.data.groups});
            }).catch(err => console.log('Get User Admin Groups------------', err));
        }
    }
    reRenderGroups = groups => {
        this.setState({groups})
    }
    render() {
        //Destructuring groups from this.state
        const{ groups } = this.state;
        return (
            <div> 
                {this.props.isDashboard ? <h1>Groups in Charge</h1> : <h1>Groups</h1>}
                <div>
            {/* Mapping over groups array and returning GroupCard with spread operator passing each property of group*/}
                    {groups.length && groups.map((group, i) => <GroupCard key={i} {...group} isDashboard={this.props.isDashboard} reRenderGroups={this.reRenderGroups}/>)}
                </div>
            </div>
        );
    }
}
//Define the default props.
Groups.defaultProps = {
    isDashboard: false
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Groups)