import React, { Component } from 'react';
//Redirects the user 
import { withRouter } from 'react-router-dom';
//Connects the component to the store.
import { connect } from 'react-redux';
//Import the components from material-ui
import { login } from '../../ducks/reducer';
import Button from '@material-ui/core/Button';
import Login from './Login/Login';
import axios from 'axios';


class Home extends Component {
    constructor() {
        super();
        this.state = {
            username: '', 
            password: ''
        }
    }
    handleLoginUsername = (val) => {
        this.setState({username: val});
    }
    handleLoginPassword = (val) => {
        this.setState({password: val});
    }
    login = () => {
        //Destructure the username from the state, so it can be used in the login endpoint.
        const { username, password } = this.state;
        const loginInfo = { username, password };
        axios.post('/api/login', loginInfo)
        .then(res => {
            this.props.login(res.data.user);
            alert('Login Successfully');
            this.props.history.push('dashboard');
        }).catch(err => console.log('Login Error---------------', err));
    }
    render() {
        const { username, password } = this.state;
        return (
            <div>
                <div>
                    <h4>Login</h4>
                    <Login username={username} password={password}
                    login={this.login}  handleUsername={this.handleLoginUsername}  handlePassword={this.handleLoginPassword} />
                    <Button variant='outlined' color='primary'>
                        <Link to='/login'>
                            Login
                        </Link>
                    </Button>
                </div>
            </div>
        );
    }
}
//Map the state to props
const mapStateToProps = state => {
    return {
        user: state.user
    };
}
//Map the dispatcher to props.
const mapDispatchToProps = {
    login: login
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));