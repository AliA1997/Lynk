module.exports = (io, Users) => {
    const users = new Users();
    // const topicUsers = [];
    // let currentMessages = [];
    // let chatExist = false;
     io.sockets.on('connection', (socket) => {
        console.log('Socket connected!!!', socket.id);
        // console.log('db-----------', db)
        const filteredUser = socket.handshake.query.username !== 'Anonymous' && topicUsers.filter(user => user.username === socket.handshake.query.username);
        !filteredUser.length && topicUsers.push({username: socket.handshake.query.username, imageurl: socket.handshake.query.imageurl});         
        socket.on('room', () => {
            io.emit('CONNECT_ROOM');         
            if(socket.handshake.query.topic) {
                console.log('socket id---------', socket.id);
                console.log('user id-----------', socket.handshake.query.user_id);
                posts.AddPostData(socket.id, socket.handshake.query.topic, +socket.handshake.query.user_id, []);
                console.log('socket joined--------', socket.handshake.query.topic);
                console.log('user imageurl-------', socket.handshake.query.imageurl);
                // console.log('users------------', users);
                socket.join(socket.handshake.query.topic);
                let usersList = users.GetUserList(socket.handshake.query.topic);
                console.log('usersList---------------', usersList);
                io.in(socket.handshake.query.topic).emit('SEND_USER', topicUsers);
            }

        });
        
        socket.broadcast.emit('SEND_USER', topicUsers);
        socket.on('TYPING', (data) => {
            console.log('typing----------', socket.handshake.query.username);
            console.log('typing-----------------', data);
            socket.broadcast.emit('USER_ON_TYPING', data);
        });
        socket.on('SEND_MESSAGE', (data) => {
            // console.log('topic----------', socket.handshake.query.topic);
            let room = users.GetUser(socket.id);
            console.log('room------------', room);
            // let roomList = users.GetUserList(room);
            data.username = socket.handshake.query.username;
            data.imageurl = socket.handshake.query.imageurl;
            users.PushMessage(room.room, data);
            // console.log('users------------', roomList);
            // console.log('currentMessage------------', users.ReturnMessages(socket.handshake.query.topic));
            console.log('users send message---------', room.messages);
            console.log('Message sent!');
            console.log('data----------', data)
            io.emit('RECEIVE_MESSAGE', data); 
        });        
        setInterval(() => {
            io.emit('SAVE_CHAT')
        }, (1000 * 10))

        socket.on('disconnect', () => {
            let room = users.RemoveUser(socket.id);
            console.log('room-------------', room);
            // let usersList = users.GetUserList(room);
            // console.log('user_id----------', room.user_id);
            // console.log('currentMessages--------------', room.messages);
            // console.log('db-------------', db);
            console.log('Socket Disconnected-------------');
            io.in(room).emit('SEND_USER', room);
        });

    })
}