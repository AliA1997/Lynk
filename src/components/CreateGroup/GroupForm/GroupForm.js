import React from 'react';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import MdAdd from 'react-icons/lib/md/add';

const GroupForm = (props) => {
    const { groupName, groupDescription, groupImage, groupMembers, currentMemberSelected, users } = props;
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
                list="members"
                label="Current Member"
                onChange={e => props.handleCurrentMember(e.target.value)}
                value={currentMemberSelected}
                margin="normal"
                />
                <datalist name='members'>
                    {users.map((user, i) => <option key={i} value={user.username}>{user.username}</option>)}
                </datalist>
                <MdAdd className='add-icon' onClick={() => currentMemberSelected && props.add(currentMemberSelected)}/>
                <Button variant='outlined' color='primary' onClick={() => props.create()}>
                    Create Group 
                </Button> 
            </form>
            <div className='attendee-list'>
                <h3>Members</h3>
                {groupMembers && groupMembers.map((member, i) => <div>
                                                                        <Chip 
                                                                        avatar={<Avatar src={member.profile_picture} />}
                                                                        label={member.username}
                                                                        onDelete={() => props.remove()}
                                                                        />
                                                                    </div>)}
            </div>
        </div>
    );
};

export default GroupForm;