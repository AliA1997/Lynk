import React, { Component } from 'react';
import './Search.css';
// import GoSearch from 'react-icons/lib/go/search';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export default class Search extends Component {
    constructor(){
        super();
        this.state = {
            search: ''
        }
    }
    render() {
        return (
            <div>
                <Button variant='contained' color='primary'>
                    <TextField 
                        id="name"
                        label="Name"
                        value={this.state.search}
                        margin="normal"
                    />
                </Button>
                
            </div>
        
        );
    }
}

