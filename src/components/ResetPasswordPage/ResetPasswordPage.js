import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FaCheckCircle from 'react-icons/lib/fa/check-circle';
import { connect } from 'react-redux';
import { resetPasswordUnmount } from '../../ducks/reducer';
import axios from 'axios';

class ResetPasswordPage extends Component {
    constructor() {
        super();
        this.state = {
            newPassword: '',
            secondPassword: ''
        }
    }
    componentWillUnmount() {
        this.props.resetPasswordUnmount();
    }
    hnadleNewPassword(val) {
        this.setState({newPassword: val});
    }
    handleSecondPassword(val) {
        this.setState({secondPassword: val});
    }
    updatePassword() {
        const { newPassword, secondPassword } = this.state;
        const { resetPasswordUsername } = this.props;
        if(newPassword === secondPassword) {
            axios.patch('/api/update_password', { newPassword, username: resetPasswordUsername}).then(res => {
                alert(res.data.message);
                this.props.history.push('/');
            }).catch(err => console.log('password update axios error---------', err));
        }
    }
    
    render() {
        const { newPassword, secondPassword } = this.state;
        return (
            <div>
                <form>
                    <TextField
                    required
                    id="new-password"
                    label="New Password"
                    onChange={e => this.hnadleNewPassword(e.target.value)}
                    value={newPassword}
                    margin="normal"
                    />
                    <TextField
                    required
                    id="repeat-password"
                    label="Repeat Password"
                    onChange={e => this.handleSecondPassword(e.target.value)}
                    value={secondPassword}
                    margin="normal"
                    />
                    <FaCheckCircle style={{fontSize: '3em', color: newPassword === secondPassword ? 'green' : 'black'}} />
                    <Button variant="outlined" onClick={() => this.updatePassword()}>Update Password</Button>
                </form>
            </div>
        );
    }
}

const mapDispatchToProps = {
    resetPasswordUnmount
}

const mapStateToProps = state => {
    return {
        resetPasswordUsername: state.resetPasswordUsername
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage);