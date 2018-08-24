const uuid = require('uuid');
module.exports = (io, Groups) => {
    // io.listen(server)
    let messages = [];
    let users = [];
    const GroupsClass = new Groups();
    io.on('connection', (socket) => {
        let userId = uuid.v4();
        io.emit('CONNECT_ROOM');
        console.log('socket.id', socket.id);
        socket.on('room', () => {
            setTimeout(() => {
                console.log('Socket Room Event Emitter Hit--------------');
                // // let userData = socket.handshake.session.user;
                // // console.log('SOcket User----------', userData);
                // console.log('Socket Room-------------', socket.handshake.query.room);
                // //
                let userToAdd = {
                    name: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.name : "Guest",
                    username: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.username : "Guest",
                    picture: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.profile_picture : null,
                    id: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.id : userId
                }
                users.push(userToAdd);
                console.log('users--------------', users);
                GroupsClass.AddUGroupData({socket_id: socket.id, users, messages, room: socket.handshake.query.room});
                console.log(GroupsClass.groups);
                socket.in(socket.handshake.query.room).emit("RECIEVE_USERS", users);
            }, 1000);

        });
        socket.on('SEND_MESSAGE', function(data){
            console.log('data------------------', data)
            const newMessage = {
                messageBody: data.messageBody,
                username: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.user.username : 'Guest',
                picture: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.user.profile_picture : null,
            }
            console.log('messaegs-----------', messages)
            messages.push(newMessage);
            socket.emit('RECEIVE_MESSAGE', messages);
        });
        
        socket.on('TYPING', function(data){
            console.log('Typing---------', data);
            socket.broadcast.emit('USER_ON_TYPING', data);
        });
        socket.on('SEND_USER', function(){
            let userToAdd = {
                name: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.user.name : "Guest",
                username: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.user.username : "Guest",
                picture: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.user.profile_picture : null,
                id: socket.handshake.session && socket.handshake.session.user ? socket.handshake.session.user.id : userId
            }
            if(!users.includes(userToAdd)) users.push(userToAdd) 
            console.log('users-----------', users);
            socket.emit('RECEIVE_USER', users);
        });
        socket.on('disconnect', () => {
            GroupsClass.RemoveGroup(socket.id);
            socket.emit('SAVE_CHAT');
        });
    });
}