import React from 'react';
import TextField from '@material-ui/core/TextField';

const Search = (props) => {
    return (
        <div>
            <div>
                <TextField 
                    label={`Search ${props.type}`}
                    onChange={e => props.handleChange(e.target.value)}
                />
            </div>
        </div>
    );
};

export default Search;