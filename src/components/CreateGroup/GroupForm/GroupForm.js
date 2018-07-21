import React from 'react';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MdAdd from 'react-icons/lib/md/add';
import MdCheck from 'react-icons/lib/md/check';
import './GroupForm.css';

const GroupForm = (props) => {
    //Destruct the props needed for the input fields
    const { groupName, groupDescription, groupImage, groupMembers, currentMemberSelected, isPrivate, users } = props;
    return (
        <div className='create-group-div'>
            <h4>Create Group</h4>
            <form className='create-group'>
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
                multiline
                rowsMax="5"        
                id="name"
                label="Group Description"
                onChange={e => props.handleDescription(e.target.value)}
                value={groupDescription}
                margin="normal"
                />
                <Button variant='outlined' color={isPrivate ? "secondary" : "primary"} onClick={() => props.handlePrivate()}>
                    <MdCheck style={{fontSize: '3em'}}/>
                </Button>
                <Avatar alt={groupName} src={groupImage} style={{height: '10em', width: '10em'}} />  
                <input type='file' placeholder='Group Image' onChange={e => props.groupImageUpload(e.target.files)} />         
                {/*Map over all the users.*/}
                <div className='select-members-div'>
                    <input type='text' list="members" placeholder="Add members" />
                    <datalist id='members'>
                        {users.map((user, i) => <option key={i} value={user.username}>{user.username}</option>)}
                    </datalist>
                    <Button variant="outlined" color="primary">
                        <MdAdd className='add-icon' style={{fontSize: '2em'}} 
                        onClick={() => currentMemberSelected && props.add(currentMemberSelected)}/>
                    </Button>
                </div>
                <Button variant='outlined' color='primary' onClick={() => props.create()}>
                    Create Group 
                </Button> 
            </form>
            <div className='group-members-list'>
                <h3>Members</h3>
                {groupMembers && groupMembers.map((member, i) => <div>
                                                                        <Chip 
                                                                        avatar={<Avatar src={member.profile_picture} />}
                                                                        label={member.username}
                                                                        onDelete={() => props.remove(member.username)}
                                                                        />
                                                                    </div>)}
            </div>
        </div>
    );
};

export default GroupForm;