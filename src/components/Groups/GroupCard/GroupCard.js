import React, { Component } from 'react';
import EditGroup from '../EditGroup/EditGroup';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import './GroupCard.css'


const CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/lynk00/image/upload';

export default class GroupCard extends Component {
    constructor() {
        super();
        this.state = {
            doEdit: false,
            editGroupName: '',
            editGroupDescription: '',
            editGroupImage: '',
        }
    }
    handleEditName = (val) => {
        this.setState({editGroupName: val});
    }
    handleEditDescription = (val) => {
        this.setState({editGroupDescription: val});
    }
    handleEditImage = (files) => {
        //axios call to server to request hashed signature
        console.log('file', files)
        console.log('files', files[0])
        axios.get('/api/upload').then(response => {
        console.log(response.data)
        
        //form data for signed uploads

        let formData = new FormData();
        formData.append("signature", response.data.payload.signature)
        formData.append("api_key", process.env.REACT_APP_CLOUDINARY_KEY);
        formData.append("timestamp", response.data.payload.timestamp)
        formData.append("file", files[0]);

        for(var pair of formData.entries()) {
            console.log(pair); 
         }
         console.log('formData---------------', formData);
        //axios call to cloudinary using the URL set at top 
            axios.post(CLOUDINARY_URL, formData).then(response => {
                console.log(response.data);

                // Setting state with the secure_url
                this.setState({
                    editGroupImage: response.data.secure_url
                })
            }).catch( err => console.log("CLoudinary Database Errorr------------", err));
        }).catch(err => console.log("get credentail error-----------", err));
    }
    deleteGroup = (id) => {
        if(window.confirm('Do you want to delete this group?')) {
            axios.delete(`/api/groups/${id}`).then(res => {
                this.setState({groups: res.data.groups});
            }).catch(err => console.log('Delete Group Error-------------', err));
        }
    }
    editGroup = (id) => {
        //Destructure the doEdit, and the editGroupName, editGroupDescription, editGroupImage from the state.
        const { doEdit, editGroupName, editGroupDescription, editGroupImage } = this.state;
        if(doEdit && (editGroupName || editGroupDescription || editGroupImage)) {
            axios.put(`/api/groups/${id}`).then(res => {
                this.setState({groups: res.data.groups});
            }).catch(err => console.log('Edit Group Error-------------', err));
        } else {
            this.setState({doEdit: !this.state.doEdit});
        }
    }
    addMembers = (id, member) => {
        axios.patch(`/api/group/${id}/add_member`, member).then(res => {
            this.setState({groups: res.data.groups});
        }).catch(err => console.log('Add Member Error----------------', err));
    }
    removeMembers = (id, member) => {
        axios.patch(`/api/group/${id}/remove_member`, member).then(res => {
            this.setState({groups: res.data.groups});
        }).catch(err => console.log('Remove Member Error----------------', err));
    }
    render() {
     const{ group_name, group_description, id, group_members, group_admin } = this.props;
     const { doEdit, editGroupName, editGroupImage, editGroupDescription } = this.state;
        return (
             <div>
                 <div>
                     {/*Displaying the group_name and group_description from props */}
                     <p>Group Name:</p>
                     {group_name}
                     <p>Group Description:</p>
                     {group_description}
                 </div>
                 {this.props.isDashboard && <Button variant='outlined' onClick={() => this.editGroup(id)}>Edit</Button>}
                 {this.props.isDashboard && <Button variant='outlined' onClick={() => this.deleteGroup(id)}>Delete</Button>}
                 <div style={{display: doEdit ? 'inline-block' : 'none'}}>
                    <EditGroup editGroup={this.editGroup} handleName={this.handleEditName} handleDescription={this.handleEditDescription}
                    handleImage={this.handleEditImage} editName={editGroupName} {...this.state}
                    groupName={group_name} groupDescription={group_description} group_members={group_members}/>
                </div>
             </div>
        );    
    }
}
GroupCard.defaultProps = {
    isDashboard: false,
}
