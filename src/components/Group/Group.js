import React, { Component } from 'react';
import Loading from '../Global/Loading/Loading';
import placeholderImage from '../../Images/default-placeholder.png';
import userPlaceholderImage from '../../Images/chat-placeholder-image.png';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import './Group.css';

class Group extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentGroup: '',
            body: '',
            messages: [],
            users: [],
            typingMessage: '',
            typing: false,
            chatLoading: true,
            loading: true
        }
        const socketParams = {room:  this.props.match.params.id}
        console.log('socketParams---------', socketParams);
        this.socket = io(`/`, {query: `room=${socketParams.room}`});
        this.sendMessage = e => {
            e.preventDefault();
            this.socket.emit('SEND_MESSAGE',{
                messageBody: this.state.body,
            });
            this.socket.emit('SEND_USER');
            this.setState({body: ''});
        }
        const addMessage = (data) => {
            let copyOfArr = this.state.messages.slice();
            copyOfArr = data;
            this.setState({messages: copyOfArr, typing: false});
        }
        const addUser = (data) => {
            let copyOfArr = this.state.users.slice();
            copyOfArr = data;
            console.log('Users-----------', copyOfArr);
            this.setState({users: copyOfArr});
        }   
        //this.isTyping 
        this.isTyping = username => {
            //NOW Emit the TYPING event emitter 
            this.socket.emit('TYPING', `${username} is typing..........`);
            this.setState({loading: true});
        }
        this.socket.on('RECEIVE_MESSAGE', data => {
            console.log('Hey', data)
            addMessage(data);
        })
        this.socket.on("RECEIVE_USER", data => {
            console.log('User-------------', data);
            addUser(data);
        })
        //CONNECT_ROOM events create a new chats
        this.socket.on('CONNECT_ROOM', () => {
            axios.get(`/api/chats/${this.props.match.params.id}`).then(res => {
                if(res.data.chat) {
                    this.setState({messages: res.data.chat.messages, users: res.data.chat.users, chatLoading: false})
                }
            }).catch(err => console.log('Read Chat Axios Errror-----------', err));
        })
        //When the typing on the socket set the typing message 
        this.socket.on('USER_ON_TYPING', (data) => {
            this.setState({typing: true, typingMessage: data})
        })
        //THe create chat will create a new chat or update a existing chat 
        this.socket.on('SAVE_CHAT', () => {
            const newChat = {id: this.props.match.params.id, messages: this.state.messages, users: this.state.users};
            axios.post(`/api/chats/${this.props.match.params.id}`, newChat).then(res => {
                alert(res.data.message);
            }).catch(err => console.log('Save CHat axios error-------------', err));
        })
        //Every five minutes it is disconnected the socket, therefore emit the emit disconnect emitter in the backend.
        //Then it will emitted in the frontend. 
        setTimeout(() => {
            this.socket.emit('disconnect');
        }, 1000 * 60 * 5);
        this.socket.emit('room');
    }
    componentDidMount() {
        axios.get(`/api/group/${this.props.match.params.id}`)
        .then(res => {
            this.setState({currentGroup: res.data.group, loading: false, chatLoading: false});
        }).catch(err => console.log('Get Individual Group Error-----------', err));
    }
    componentDidUpdate(nextProps, nextState) {
        console.log(nextState);
        return;
    }
    componentWillUnmount() {
        ///Clear timeouts to prevent memory leaks.
        clearTimeout();
    }
    handleMessage = (val) => {
        this.setState({body: val});
    }
    render() {
        const { loading, chatLoading, body, messages, users, typing, typingMessage } = this.state;
        console.log('messages----------', messages);
        console.log('users----------', users);
        const { group_name, group_description, group_image, group_members, username, profile_picture } = this.state.currentGroup;
        // console.log('this.state.currentGroup-------------', this.state.currentGroup);
        if(!loading) {
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
                        <div className="groupchat-container">
                            <div className='groupchat-messages-container-div'>
                                <Typography>Messages</Typography>
                                <div className='groupchat-messages-div'>
                                    {!chatLoading ? 
                                    messages.length ? messages.map((message, i) => <div key={i + 1}>
                                                                                    <Chip avatar={<Avatar src={message.picture || userPlaceholderImage} alt={message.username} />} label={message.username} />
                                                                                    <Typography>{message.messageBody}</Typography>
                                                                                </div>) : null
                                    : <Loading />}
                                    {typing && <p>{typingMessage}</p>}
                                </div>
                            </div>
                            <div className='groupchat-users-container-div'>
                                <Typography>Users</Typography>
                                {!chatLoading ? 
                                <div className='groupchat-users-div'>
                                    {users.length ? users.map(user => <Chip key={user.id} avatar={<Avatar src={user.picture || userPlaceholderImage} alt={user.username} />} label={user.username} />) : null}
                                </div>
                                : <Loading />}
                            </div>
                            <TextField
                                required
                                id="name"
                                label="Send Message"
                                onChange={e => this.handleMessage(e.target.value)}
                                value={body}
                                margin="normal"
                            />
                            <Button onClick={(e) => this.sendMessage(e)}>Send Message</Button>
                        </div>
                    </div>
                </div>
            );
        } else {
            return <Loading />
        }
    }
}

const mapStateToProps = state => {
    return { 
        user: state.user
    }
}
export default connect(mapStateToProps)(Group);