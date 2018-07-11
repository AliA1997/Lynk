import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './UserForm.css';


const ages = [];
for(let i = 0; i < 110; i++) {
  ages.push(i);
}


const UserForm = (props) => {
    //Destructure all the props passed by the Register Parent Component.
    const { name, username, email, password, age } = props;
    return (
        <form>
            <TextField
            required
            id="name"
            label="Name"
            value={name}      
            onChange={e => props.handleName(e.target.value)}
            margin="normal"
          />
          <TextField
            required
            id="username"
            label="username"
            defaultValue="username"
            onChange={e => props.handleUsername(e.target.value)}
            value={username}
            margin="normal"
          />
          <TextField
            required
            id="email"
            label="email"
            value={email}
            onChange={e => props.handleEmail(e.target.value)}
            defaultValue="Hello World"
            margin="normal"
          />
        
          <TextField
            required
            id="password-input"
            label="password"
            type="password"
            value={password}
            onChange={e => props.handlePassword(e.target.value)}
            autoComplete="current-password"
            margin="normal"
          />
            <TextField
              required
              id="ages"
              value={age}
              type='date'
              onChange={e => props.handleAge(e.target.value)}
              autoComplete="age"
              margin="normal"
          />
          <Button variant='outlined' color='primary' onClick={() => props.register()}>
            Register 
          </Button> 
        </form>
    );
};

export default UserForm;