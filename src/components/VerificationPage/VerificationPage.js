import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import './VerificationPage.css';
import axios from 'axios';

class VerificationPage extends Component {
    componentDidMount() {
        //Destruct the user from props.
        const { user } = this.props;
        //Define a setTimeout, and run an axios patch request to your endpoint setting your verified to true.
        setTimeout(() => {
            if(user) {
                axios.patch(`/api/users/${user.id}/verify_email`).then(res => {
                    alert(res.data.message);
                }).catch(err => console.log('Axios Patch Error----------------', err));
                //Then redirect them to dashboard.
                this.props.history.push('/dashboard');
            }
        }, 10000)
    }
    componentWillUnmount() {
        //Cleaer the timeouts to prevent a memory leak.
        clearTimeout();
    }
    render() {
        const { user } = this.props;
        return (
            <div>
                <h1 className='account-verified-text'>{user && user.username}</h1>
                <h1 className='account-verified-text'>Account Verified!</h1>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.user 
    }
}

export default withRouter(connect(mapStateToProps)(VerificationPage));