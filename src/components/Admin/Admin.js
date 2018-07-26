import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
//import component you are gonna use
import UserCardContainer from './UserCardContainer/UserCardContainer';
import Loading from '../Global/Loading/Loading';
///Iimport Material-ui componnents
import Typography from '@material-ui/core/Typography';
//Import axios to perform axios calls to backend.
import axios from 'axios';

class Admin extends Component {
    constructor() {
        super();
        this.state = {
            users: [],
            loading: true
        }
    }
    componentDidMount() {
        const { user } = this.props;
        if(user.is_admin) {
            axios.get('/api/admin/users').then(res => {
                const { users } = this.state;
                console.log('users---------', users);
                //Set the users state to res.data.users
                this.setState({users: res.data.users, loading: false});
            }).catch(err => console.log('Users Axios Error--------', err));
        } else {
             this.props.history.push('/');
        }
    }
   reRenderUsers = (users) => {
       this.setState({users});
   }
    render() {
        //Destruct the users from teh state.
        const { users, loading } = this.state;
        if(!loading) {
            return (
                <div>
                    <Typography>Admin</Typography>
                    <div>
                    </div>
                    <div>
                        {users && users.length ? users.map((user, i) => <UserCardContainer key={i} {...user} reRenderUsers={this.reRenderUsers}/>) : null}
                    </div>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => {
    return {
        user: state.user 
    }
}

export default withRouter(connect(mapStateToProps)(Admin));