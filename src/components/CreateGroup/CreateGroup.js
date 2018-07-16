import React, { Component } from 'react';
import GroupForm from './GroupForm/GroupForm';
import './CreateGroup.css';
import axios from 'axios';

const CLOUDINARY_URL ='https://api.cloudinary.com/v1_1/lynk00/image/upload';
export default class CreateGroup extends Component {
    constructor() {
        super();
        this.state = {
            groupName: '',
            groupDescription: '',
            groupImage: '',
            currentMemberSelected: '',
            groupMembers: [],
        }
    }
    handleGroupName = (val) => {
        //Handle changes in the group name input field
        this.setState({groupName: val})
    }
    handleGroupDescription = (val) => {
        //Handle changes in the group description input field
        this.setState({groupDescription: val})        
    }
    handleCurrentGroupMember = (val) => {
        //Handle changes in the current group member input field
        this.setState({currentMemberSelected: val})        
    }
    addGroupMember = (val) => {
        //Copy of the array, so your add to it.
        let copyOfArr = this.state.groupMembers.slice();
        //Push to the copy of the array.
        copyOfArr.push(val);
        this.setState({groupMembers: copyOfArr});
    }
    removeGroupMember = (val) => {
        //Copy array, so you can remove from it.
        let copyOfArr = this.state.groupMembers.slice();
        //Get the index of the value to be remove.
        let removeGroupMemberIndex = copyOfArr.findIndex(member => member === val);
        //Remove value from array based on the index.
        copyOfArr.splice(removeGroupMemberIndex, 1);
        //Then set the state of the group members to the copy of array.
        this.setState({groupMembers: copyOfArr});
    }
    groupImageUpload = (files) => {
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
                    groupImage: response.data.secure_url
                })
            }).catch( err => console.log("CLoudinary Database Errorr------------", err));
        }).catch(err => console.log("get credentail error-----------", err));
    }
    createGroup = () => {
        ///Destruct the groupName, groupDescription, and groupMembers from the state.
        const { groupName, groupDescription, groupImage, groupMembers } = this.state;
        //Assign a new group to the properties of the object.
        const newGroup = { groupName, groupDescription, groupImage,  groupMembers };
        axios.post('/api/groups', newGroup).then(res => {
            console.log(res.data.group);
            alert('Group Created-----------');
        }).catch(err => console.log(err, 'Create Group Database Error--------------'));
    }
    render() {
        const { groupName, groupDescription, groupImage, groupMembers, currentMemberSelected } = this.state;
        return (
            <div className='create-group-form'>
                    <GroupForm groupImage={groupImage} groupImageUpload={this.groupImageUpload}
                    groupName={groupName} groupDescription={groupDescription} groupMembers={groupMembers} currentMemberSelected={currentMemberSelected}
                    create={this.createGroup} handleName={this.handleGroupName} handleDescription={this.handleGroupDescription}
                    handleCurrentMember={this.handleCurrentGroupMember} add={this.addGroupMember} remove={this.removeGroupMember}/>
            </div>
        );
    }
}