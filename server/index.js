//Configuring our env file.
require('dotenv').config();
//Initializes the server
const express = require('express');
//Middlewares   
//For hosting.
const cors = require('cors');
//Initiallizes the req.body, so without it, the req.body will not be defined.
const bodyParser = require('body-parser');
//Initializes the session
const session = require('express-session');
//Initializes the Database
const massive  = require('massive');
//Connects session to database.
const pgSession = require('connect-pg-simple')(session);
///Define the server 
const app =  express();
//Installing Nodemailer
const nodemailer = require('nodemailer');

//Connect to database with the connection string from your .env file.
//And configure your server to it.
massive(process.env.CONNECTION_STRING).then(database => {
    //Then assign the database, directory of the sql files to the server.
    app.set('db', database);
}).catch(err => console.log(err, 'Database Connection Error'))
//Requiring the UsersClass file
const{ Users } = require('./helpers/UsersClass');


//Controller Files 
const user = require("./controllers/user_controller");
const cloudinary = require('./controllers/cloudinary_controller');
const chat = require('./controllers/chat_controller');
const event = require('./controllers/event_controller');
const group = require('./controllers/group_controller');
const nm = require('./controllers/nodemailer_controller');
const search = require('./controllers/search_controller');
//

///Use express.static to render public files from the build folder for hosting
app.use(express.static(`${__dirname}/../build`));

//Initialize our bodyParser data.
app.use(bodyParser.json());

//Initialize our session
app.use(session({
    secret: process.env.SESSION_SECRET,
    //If the session is import then initialize the store for the session
    store: session && new pgSession({
        //Uses the connection string to connect to database
        conString: process.env.CONNECTION_STRING,
        //Insert this table.
        tableName: 'session'
    }),
    resave: false,
    saveUninitialized: true,
    //Age of the session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));

app.use(cors());

//Cloudinary Endpoints 
app.get('/api/upload', cloudinary.upload);

//User Endpoints 
app.get('/api/user-data', user.readUserData);
app.post('/api/login', user.login);
app.post('/api/register', user.register);
//Verify Email endpoints
app.patch('/api/users/:id/verify_email', user.verifyEmail);

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
// app.get('/api/groups/user', group.readUserGroups);
app.get('/api/users/dropdown', group.readUsersDropdown);


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
app.post('/api/contactform', nm.sendEmail);
// app.post('/api/test', nm.test);

///For all paths 
const path = require('path')
app.get('*', (req, res)=>{
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

///Server listening on port 4000.
const server = app.listen(4000, () => console.log('Listening on Port: 4000'));

const io = require('socket.io')(server);

setTimeout(() => {
    //Requiring Socket.IO
    const socket = require('./socket/socket')(io, Users);
    }, 0)


