import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import MdCheck from 'react-icons/lib/md/check';
import MdAdd from 'react-icons/lib/md/add';


const EditGroup = (props) => {
    const { editName, editGroupImage, groupImage, groupName, groupMembers,  editDescription, editIsPrivate, isPrivate, currentMemberSelected, users } = props;
    console.log('editGroup Group Members------------', groupMembers);
    return (
        <div>
            <form>
                <TextField
                    required
                    id="name"
                    label="Group Name"
                    onChange={e => props.handleName(e.target.value)}
                    value={editName}
                    placeholder={groupName}
                    margin="normal"
                    />
                    <TextField
                    required
                    multiline
                    rowsMax="5"
                    id="description"
                    label="Group Description"
                    onChange={e => props.handleDescription(e.target.value)}
                    value={editDescription}
                    margin="normal"
                    />
                    <Button variant='outlined' color={editIsPrivate ? 'secondary': 'primary'} onClick={() => props.handleIsPrivate()}>
                        Is Private: {JSON.stringify(isPrivate)}<MdCheck style={{fontSize: '3em'}} />
                    </Button>
                    <Avatar alt={groupName} src={editGroupImage || groupImage} style={{height: '10em', width: '10em'}} />  
                    <input type='file' placeholder={groupImage} onChange={e => props.handleImage(e.target.files)} />         
                    <div className='select-members-div'>
                        <input type='text' list="members" placeholder="Add members" />
                        <datalist id='members'>
                            {users.map((user, i) => <option key={i} value={user.username}>{user.username}</option>)}
                        </datalist>
                        <Button variant='outlined' color='primary'>
                            <MdAdd className='add-icon' style={{fontSize: '2em'}} 
                            onClick={() => currentMemberSelected && props.add(currentMemberSelected)}/>
                        </Button>
                    </div>
            </form>
        </div>
    );
};

export default EditGroup;