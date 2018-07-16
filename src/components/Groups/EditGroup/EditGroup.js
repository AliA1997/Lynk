import React from 'react';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';


const EditGroup = (props) => {
    const { editName, groupImage, groupDescription, groupName, editDescription, editImage } = props;
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
                    id="name"
                    label="Group Description"
                    onChange={e => props.handleDescription(e.target.value)}
                    value={editDescription}
                    margin="normal"
                    />
                    <Avatar alt={groupName} src={groupImage} style={{height: '10em', width: '10em'}} />  
                    <input type='file' placeholder={groupImage} onChange={e => props.handleImage(e.target.files)} />         
                    {/* <TextField
                    required
                    id="members"
                    label="Current Member"
                    onChange={e => props.handleCurrentMember(e.target.value)}
                    value={currentMemberSelected}
                    margin="normal"
                    /> */}
                    <datalist name='members'>
                        {/* {groupMembers.map(member => <option>{member}</option>)} */}
                    </datalist>
            </form>
        </div>
    );
};

export default EditGroup;