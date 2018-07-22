import React, { Component } from 'react';
import GroupCard from './GroupCard/GroupCard';
import axios from 'axios';
import { connect } from 'react-redux';
import Loading from '../Global/Loading/Loading';
import { Typography } from '../../../node_modules/@material-ui/core';

class Groups extends Component {
    constructor(){
        super();
        this.state= {
            groups: [],
            loading: true
        }
    }

    componentDidMount() {
        let arr = [];
        //Axios call setting state with groups array
        //If there is no isDashboard prop.
        if(!this.props.isDashboard) {
            axios.get('/api/groups').then(res => {
                //Gets all default groups
                this.setState({groups: res.data.groups, loading: false})
            }).catch(err => console.log('Get Groups Error-------------', err));
        } else if(this.props.isDashboard && this.props.groupsUserAdmin) {
            //Destructiong the user
            const { user } = this.props;
            axios.get(`/api/groups/admin/${user.id}`).then(res => {
                //Only display five groups.
                for(let i = 0; i < 5; i++) {
                    if(res.data.groups[i]) arr.push(res.data.groups[i]);
                }
                //Get all groups that the user is in charge of.
                this.setState({groups: arr, loading: false});
            }).catch(err => console.log('Get User Admin Groups------------', err));
        } else if(this.props.isDashboard && this.props.groupsUserPartOf) {
            //Destruct the user
            const { user } = this.props;
            //Get the groups the user is a part of based on the props.
            axios.get(`/api/groups/user/${user.id}`).then(res => {
                //Only display five groups.
                for(let i = 0; i < 5; i++) {
                    if(res.data.groups[i]) arr.push(res.data.groups[i]);
                }
                //Get all the groups .
                this.setState({groups: arr, loading: false});
            }).catch(err => console.log('Get User Groups------------', err));
        }
    }
    reRenderGroups = groups => {
        this.setState({groups})
    }
    render() {

        //Destructuring groups from this.state
        const{ groups, loading } = this.state;
        if(!loading) {
            return (
                <div> 
                    <div>
                {/* Mapping over groups array and returning GroupCard with spread operator passing each property of group*/}
                        {groups.length ? 
                        groups.map((group, i) => <GroupCard key={i} {...group} isDashboard={this.props.isDashboard} reRenderGroups={this.reRenderGroups}/>)
                        : <Typography>Sorry they are no groups........ &#x1F622;</Typography>}
                    </div>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}
//Define the default props.
Groups.defaultProps = {
    isDashboard: false,
    groupsUserPartOf: false,
    groupsUserAdmin: false
}

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Groups)