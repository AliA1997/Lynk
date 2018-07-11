import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './Login.css';

const Login = (props) => {
    const { username, password } = props;
    return (
        <div>
            <div>
                <TextField
                    required
                    id="username"
                    label="username"
                    onChange={e => props.handleUsername(e.target.value)}
                    value={username}
                    margin="normal"
                />
                <TextField
                    required
                    id="password"
                    label="password"
                    onChange={e => props.handlePassword(e.target.value)}
                    value={username}
                    margin="normal"
                />
                <Button variant='outlined' color='primary' onClick={() => props.login()}>
                    Login
                </Button> 
            </div>
        </div>
    );
};

export default Login;