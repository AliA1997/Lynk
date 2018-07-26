import React, { Component } from 'react';
import GroupChat from './GroupChat/GroupChat';
import placeholderImage from '../../Images/default-placeholder.png';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import './Group.css';

class Group extends Component {
    constructor() {
        super();
        this.state = {
            currentGroup: '',
            messageBody: '',
            messages: [],
            users: []
        }
        this.socket = io();
        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE',{
                messageBody: this.state.messageBody,
            });
            this.setState({messageBody: '', messages: []});
        }
                    
        const addMessage = (data) => {
            let copyOfArr = this.state.messages.slice();
            copyOfArr.push(data);
            this.setState({messages: copyOfArr});
        }
         const addUser = (data) => {
             let copyOfArr = this.state.messages.slice();
             copyOfArr.push(data);
             this.setState({users: copyOfArr});
         }   
        this.socket.on('RECEIVE_MESSAGE', data => {
            console.log('Hey', data)
            addMessage(data);
        })
        this.socket.on("RECIEVE_USERS", data => {
            console.log('User', data);
            addUser(data);
        })
    }
    componentDidMount() {
        axios.get(`/api/group/${this.props.match.params.id}`)
        .then(res => {
            this.setState({currentGroup: res.data.group});
        }).catch(err => console.log('Get Individual Group Error-----------', err));
    }
    handleMessage = (val) => {
        this.setState({messageBody: val});
    }
    render() {

        const { group_name, group_description, group_image, group_members, username, profile_picture } = this.state.currentGroup;
        // console.log('this.state.currentGroup-------------', this.state.currentGroup);
        return (
            <div className='group-page-container-div'>
                <div className='group-page-div'>
                    <div className='group-image-div'>
                        <img src={group_image || placeholderImage} alt={group_name} className='group-page-image'/>
                    </div>
                    <h3>Group Name:</h3>
                    <h3>{group_name && group_name}</h3>
                    <h3>Operated by: <Chip 
                                        avatar={<Avatar src={profile_picture} alt={username} />}
                                        label={username}
                                        /></h3>
                    <div className='group-description-div'>
                        <p>{group_description && group_description}</p>
                    </div>
                    <div className='group-members-div'>
                        {group_members && group_members.length && group_members.map(member => <p>{member}</p>)}
                    </div>
                    <GroupChat {...this.state} sendMessage={this.sendMessage} handleMessage={this.handleMessage}/>
                </div>
            </div>
        );
    }z
}

const mapStateToProps = state => {
    return { 
        user: state.user
    }
}
export default connect(mapStateToProps)(Group);