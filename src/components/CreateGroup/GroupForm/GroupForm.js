import React from 'react';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import './GroupForm.css';


const GroupForm = (props) => {
    const { groupName, groupDescription, groupImage, groupMembers, currentMemberSelected } = props;
    return (
        <div className='create-group-div'>
            <h4>Create Group</h4>
            <form>
                <TextField
                required
                id="name"
                label="Group Name"
                onChange={e => props.handleName(e.target.value)}
                value={groupName}
                margin="normal"
                />
                <TextField
                required
                id="name"
                label="Group Description"
                onChange={e => props.handleDescription(e.target.value)}
                value={groupDescription}
                margin="normal"
                />
                <Avatar alt={groupName} src={groupImage} style={{height: '10em', width: '10em'}} />  
                <input type='file' placeholder='Group Image' onChange={e => props.groupImageUpload(e.target.files)} />         
                <TextField
                required
                id="members"
                label="Current Member"
                onChange={e => props.handleCurrentMember(e.target.value)}
                value={currentMemberSelected}
                margin="normal"
                />
                <datalist name='members'>
                    {groupMembers.map(member => <option>{member}</option>)}
                </datalist>
                <Button variant='outlined' color='primary' onClick={() => props.create()}>
                    Create Group 
                </Button> 
            </form>
            <div className='group-members-list'>
                <h3>Members</h3>
                {groupMembers && groupMembers.map(attendee => <p>{attendee}</p>)}
            </div>
        </div>
    );
};

export default GroupForm;