import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//Import the form component that edit's the form
import EditGroup from '../EditGroup/EditGroup';
//Placeholder image
import placeholderImage from '../../../Images/default-placeholder.png';
//Import the components from material-ui that are needed to edit the group.
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
//Import axios that is responsible for talking with the backend.
import axios from 'axios';
//Import the css file for styling.
import './GroupCard.css'


const CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/lynk00/image/upload';

export default class GroupCard extends Component {
    constructor() {
        super();
        this.state = {
            //Define the state that will be the new values.
            doEdit: false,
            editGroupName: '',
            editGroupDescription: '',
            editGroupImage: '',
            editIsPrivate: false,
            currentMemberSelected: '',
            users: []
        }
    }
    //ENable users dropdown
    componentDidMount() {
        ///Get all the users so you can insert them into the dropdown.
        axios.get("/api/users/dropdown").then(res =>{
            console.log('users--------------------', res.data.users)
            this.setState({users: res.data.users});
        }).catch(err => console.log('Get users dropdown error', err));
    }
    //Handle changes in the name input field
    handleEditName = (val) => {
        this.setState({editGroupName: val});
    }
    //Handle changes in the description input field.
    handleEditDescription = (val) => {
        this.setState({editGroupDescription: val});
    }
    //Handle the editPrivate for edit button. 
    handleEditPrivate = () => {
        this.setState({editIsPrivate: !this.state.editIsPrivate});
    }
    //Handle Current Member
    handleCurrentGroupMember = (val) => {
        //Handle changes in the current group member input field
        this.setState({currentMemberSelected: val})        
    }
    //Handle the image upload for the uploading images.
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
    //Handle the responsible for deleting groups.
    deleteGroup = (id) => {
        if(window.confirm('Do you want to delete this group?')) {
            console.log('delete groups------------- id', id);
            axios.delete(`/api/group/${id}`).then(res => {
                this.setState({groups: res.data.groups});
            }).catch(err => console.log('Delete Group Error-------------', err));
        }
    }
    //Handle the responsible for editing groups.
    editGroup = (id) => {
        //Destructure the doEdit, and the editGroupName, editGroupDescription, editGroupImage from the state.
        const { doEdit, editGroupName, editGroupDescription, editGroupImage, editIsPrivate } = this.state;
        //Destruct the props 
        const{ group_name, group_description,  group_image } = this.props;
        //Assign the new group to the values destrcuted from state.
        const newGroup = { id, group_name: editGroupName ? editGroupName : group_name, 
                            group_description: editGroupDescription ? editGroupDescription : group_description,
                            group_image: editGroupImage ? editGroupImage : group_image,
                            is_private: editIsPrivate };
        console.log('editgroup this.state------------', this.state);
        if(doEdit && (editGroupName || editGroupDescription || editGroupImage || editIsPrivate)) {
            console.log('if statement hit-------------');
            axios.put(`/api/group/${id}`, newGroup).then(res => {
                alert('Group Edited-------------');
                this.setState({doEdit: false});
                this.props.reRenderGroups(res.data.groups);
            }).catch(err => console.log('Edit Group Error-------------', err));
        } else {
            this.setState({doEdit: !this.state.doEdit});
        }
    }
    //Handling add new memebers to the currentGroup via the patch request.
    addMembers = (id, member) => {
        axios.patch(`/api/group/${id}/add_member`, member).then(res => {
            this.setState({groups: res.data.groups});
        }).catch(err => console.log('Add Member Error----------------', err));
    }
    //Handling remove member from the currentGroup via the patch request.
    removeMembers = (id, member) => {
        axios.patch(`/api/group/${id}/remove_member`, member).then(res => {
            this.setState({groups: res.data.groups});
        }).catch(err => console.log('Remove Member Error----------------', err));
    }
    render() {
     const{ group_name, group_description, id, group_members, group_image, is_private } = this.props;
     const { doEdit, editGroupName } = this.state;
        return (
             <div>
                    <Card>
                    <Link to={`/groups/${id}`} style={{textDecoration: 'none'}}>
                        {/*Displaying the group_name and group_description from props */}
                        <CardHeader
                        avatar={<Avatar src={group_image || placeholderImage} alt={group_name}  />
                        }
                        title={group_name}
                        subheader={group_description}
                    />
                    {group_name}
                    <CardMedia 
                        image={group_image || placeholderImage}
                        title={group_name}
                    />
                    {group_members && group_members.length && group_members.map((member, i) => <Chip
                                                                                                avatar={<Avatar src={member.profile_picture}/>}
                                                                                                label={member.email}
                                                                                                onDelete={() => console.log('member--------', member)}
                                                                                                />)}
                    <CardContent>
                        <Typography component='p'>{group_description}</Typography>
                    </CardContent>
                    </Link>
                    {this.props.isDashboard && <Button variant='outlined' onClick={() => this.editGroup(id)}>Edit</Button>}
                    {this.props.isDashboard && <Button variant='outlined' onClick={() => this.deleteGroup(id)}>Delete</Button>}
                    </Card>
                    <div style={{display: doEdit ? 'inline-block' : 'none'}}>
                        <EditGroup editGroup={this.editGroup} handleName={this.handleEditName} handleDescription={this.handleEditDescription}
                        handleImage={this.handleEditImage} editName={editGroupName} {...this.state} handleIsPrivate={this.handleEditPrivate}
                        groupName={group_name} groupDescription={group_description} groupMembers={group_members} isPrivate={is_private}/>
                    </div>
             </div>
        );    
    }
}
GroupCard.defaultProps = {
    isDashboard: false,
}
