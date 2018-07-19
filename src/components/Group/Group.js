import React, { Component } from 'react';
import axios from 'axios';

export default class Group extends Component {
    constructor() {
        super();
        this.state = {
            currentHouse: ''
        }

    //     this.socket = io('/', {query: `username=${user ? user.username : 'Anonymous'}&topic=${props.topic}&post_id=${props.postId}&imageurl=${user ? user.image :'https://www.androidpolice.com/wp-content/uploads/2013/04/nexusae0_googlenow_help_avatar_thumb.png'}`});
    //     console.log('--------room prop', props.topic);
    //     this.sendMessage = (val) => {
    //         console.log(val);
    //         const newMessage = {
    //             message: val
    //         }
    //         console.log('Message sent---------', val);
    //         this.socket.emit('SEND_MESSAGE', newMessage);
    //     }
    //     this.isTyping = (username) => {  
    //         this.socket.emit('TYPING', `${username} is typing.....`);
    //         this.setState({typing: true});
    //     }
    //     this.socket.on('CONNECT_ROOM', () => {
    //         axios.get(`/api/chat/${props.postId}`)
    //         .then(res => {
    //             alert(res.data.message);
    //             if(res.data.messages) {
    //                 this.setState({chatExist: true, messages: res.data.messages, users: res.data.users});
    //             }
    //         }).catch(err => console.log('Axios Connect Room Error---------', err));
    //     })
    //     this.socket.on('SEND_USER', (data) => {
    //         this.setState({users: data});
    //     });
    //     this.socket.on('RECIEVE_MESSAGE', (data) => {
    //         console.log('data------------', data);
    //         console.log('received messages hit---------');
    //         // console.log('messages------------', this.state.messages);
    //         this.setState({messages: [...this.state.messages, data], typing: false, message: ''});
    //     });
    //     this.socket.on('SAVE_CHAT', () => {
    //         //
    //         // const { chatExist } = this.state;
    //         //
    //         console.log('hit save chat event emitter')
    //         // console.log('state.messages-----------', this.state.messages);
    //         // if(this.state.messages.length && this.state.users.length > 1){
    //         if(this.state.messages.length) {
    //         // const axiosChatPromise = chatExist ? axios.put(`/api/chat/${props.postId}`, {messages: this.state.messages, users: this.state.users}) 
    //         // : axios.post(`/api/chat/${props.postId}`, {messages: this.state.messages, users: this.state.users});
    //         return axios.post(`/api/chat/${props.postId}`, {messages: this.state.messages, users: this.state.users})
    //         .then(res => {
    //             console.log('message hit----------');
    //             alert(res.data.message); 
    //         }).catch(err => console.log('Axios Chat Error------------', err));
    //         } else {
    //             return;
    //         }
    //     })
    //     this.socket.on('USER_ON_TYPING', (data) => {
    //         // console.log('TYPING event emitter data--------', data)
    //         // this.socket.emit('TYPING', data);
    //         this.setState({typing: true, typingMessage: data});
    //         // console.log('TYPING event emitter hit----------', this.state.typing);
    //         // console.log('Typing message---------', this.state.typingMessage);
    //     })
    //     this.socket.emit('room');
    // }
    // componentDidMount() {
    //     axios.get(`/api/group/${this.props.match.params.id}`)
    //     .then(res => {
    //         this.setState({currentHouse: res.data.house});
    //     }).catch(err => console.log('Get Individual House Error-----------', err));
    }
    render() {
        const { group_name, group_description, group_image, group_members, username } = this.state.currentHouse;
        return (
            <div>
                <div>
                    <div>
                        <img src={group_image} alt={group_name} />
                    </div>
                    <h3>Group Name:</h3>
                    <h3>{group_name}</h3>
                    <h3>Operated by {username}</h3>
                    <div className='group-description-div'>
                        <p>{group_description}</p>
                    </div>
                    <div className='group-members-div'>
                        {group_members.length && group_members.map(member => <p>{member}</p>)}
                    </div>
                </div>
            </div>
        );
    }
}