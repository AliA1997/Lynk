//Configuring our env file.
require('dotenv').config();
//Initializes the server
const express = require('express');
///Assgn the server 
const app =  express();
//Use http  server for connecting to sockets.
//Middlewares   
//For hosting.
const cors = require('cors');
//Initiallizes the req.body, so without it, the req.body will not be defined.
const bodyParser = require('body-parser');
//Initializes the session
const session = require('express-session');
//Middleware for the socket using io.use()
//Use socket.io-express-session assign a session object to the handshake.session.
const socketSession = require('express-socket.io-session');
//Initializes the Database
const massive  = require('massive');
//Connects session to database.
const pgSession = require('connect-pg-simple')(session);
//Server for socket.io 
const server = require('http').Server(app);
//Define the io for sockets.
const io = require('socket.io')(server);
//Installing Nodemailer
const nodemailer = require('nodemailer');

//Connect to database with the connection string from your .env file.
//And configure your server to it.
massive(process.env.CONNECTION_STRING).then(database => {
    //Then assign the database, directory of the sql files to the server.
    app.set('db', database);
}).catch(err => console.log(err, 'Database Connection Error'))
//Requiring the UsersClass file
const{ Groups } = require('./helpers/GroupsClass');


//Controller Files 
const user = require("./controllers/user_controller");
const cloudinary = require('./controllers/cloudinary_controller');
const chat = require('./controllers/chat_controller');
const event = require('./controllers/event_controller');
const group = require('./controllers/group_controller');
const nm = require('./controllers/nodemailer_controller');
const search = require('./controllers/search_controller');
const socialMedia = require('./controllers/social_media_controller');
const admin = require('./controllers/admin_controller');
//

///Use express.static to render public files from the build folder for hosting
app.use(express.static(`${__dirname}/../build`));

//Initialize our bodyParser data.
app.use(bodyParser.json());

//Initialize our session and assign to a variable since you would wanto use for socket session.
const userSession = session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    //If the session is import then initialize the store for the session
    store: session && new pgSession({
        //Uses the connection string to connect to database
        conString: process.env.CONNECTION_STRING,
        //Insert this table.
        tableName: 'session'
    }),
    saveUninitialized: true,
    //Age of the session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
});

app.use(userSession);

setTimeout(()  => io.use(socketSession(userSession, {
    autoSave: true
})), 2000)

//Enable the middleware needed for session.

app.use(cors());
// setTimeout(() => {
    //Cloudinary Endpoints d
    app.get('/api/upload', cloudinary.upload);

    //Admin Endpoints 
    app.get('/api/admin/users', admin.readUsers);
    app.get('/api/admin/groups', admin.readGroups);
    app.get('/api/admin/events', admin.readEvents);
    app.post('/api/admin/warning/user', admin.warnUser);
    app.post('/api/admin/warning/groups/:id', admin.warnGroupAdmin);
    app.post('/api/admin/warning/events/:id', admin.warnEventAdmin);
    app.delete('/api/admin/users/:id', admin.deleteUser);
    app.delete('/api/admin/groups/:id', admin.deleteGroup);
    app.delete('/api/admin/events/:id', admin.deleteEvent);


    //User Endpoints 
    app.get('/api/user-data', user.readUserData);
    app.post('/api/logout', user.logout);
    app.post('/api/login', user.login);
    app.post('/api/register', user.register);
    app.post('/api/forgot_password', nm.forgetPasswordNotification);
    app.post('/api/facebook-login', socialMedia.facebookLogin);
    app.post('/api/google-login', socialMedia.googleLogin);
    //Verify Email endpoints
    app.patch('/api/users/:id/verify_email', user.verifyEmail);
    //Forget Password Endpoints
    app.patch('/api/update_password', user.updatePassword);

    //Group Endpoints 
    app.get('/api/group/:id', group.readGroup)
    app.get('/api/groups', group.readGroups);
    app.post('/api/groups', group.createGroup);
    app.put('/api/group/:id', group.updateGroup);
    app.delete('/api/group/:id', group.deleteGroup);
    app.patch('/api/group/:id/add_member', group.addMember);
    app.patch('/api/group/:id/remove_member', group.removeMember);


    //Dashboard Group Endpoints 
    app.get('/api/groups/admin/:id', group.readUserAdminGroups);
    app.get('/api/groups/user/:user', group.readUserGroups);
    app.get('/api/users/dropdown', group.readUsersDropdown);

    //Dashboard Events Endpoints 
    app.get('/api/events/admin/:id', event.readUserAdminEvents);
    app.get('/api/events/user/:id', event.readUserEvents);

    //Event Endpoints
    app.get('/api/events', event.readEvents);
    app.get('/api/event/:id', event.readEvent);
    app.post('/api/events', event.createEvent);
    app.put('/api/event/:id', event.updateEvent);
    app.delete('/api/event/:id', event.deleteEvent);
    app.patch('/api/event/:id/add_attendee', event.addAttendee);
    app.patch('/api/event/:id/remove_attendee', event.removeAttendee);

    //Search Endpoints 
    //Search Group Endpoints
    app.get('/api/groups/search', search.searchGroup);
    //Search Event Endpoints 
    app.get('/api/events/search', search.searchEvent);

    //Chat Endpoints
    app.get('/api/chats', chat.readChat);
    app.post('/api/chats', chat.createChat);

    //Contact Endpoints
    app.post('/api/contactform', nm.sendEmail);``
// }, 0);
// app.post('/api/test', nm.test);
///For all paths 
const path = require('path')
app.get('*', (req, res)=>{
    // path.join(__dirname, '../build/
  res.sendFile(path.join(__dirname, '../build/index.html'));
});
///Server listening on port 4000.
server.listen(4000, () => console.log('Listening on Port: 4000'));
setTimeout(() => {
    require('./socket')(io, Groups);
}, 0);
//