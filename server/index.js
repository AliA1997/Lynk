//Configuring our env file.
require('dotenv').config();
//Initializes the server
const express = require('express');
//Installing Nodemailer
const nodemailer = require('nodemailer');
//Middlewares   
//Initiallizes the req.body, so without it, the req.body will not be defined.
const bodyParser = require('body-parser');
//Initializes the session
const session = require('express-session');
//Initializes the Database
const massive  = require('massive');
//
//Connect to database with the connection string from your .env file.
//And configure your server to it.
massive(process.env.CONNECTION_STRING).then(database => {
    //Then assign the database, directory of the sql files to the server.
    app.set('db', database);
}).catch(err => console.log(err, 'Database Connection Error'))

//Controller Files 
const user = require("./controllers/user_controller");
const cloudinary = require('./controllers/cloudinary_controller');
const chat = require('./controllers/chat_controller');
const event = require('./controllers/event_controller');
const group = require('./controllers/group_controller');
//


///Define the server 
const app =  express();


//Initialize our bodyParser data.
app.use(bodyParser.json());

//Initialize our session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    //Age of the session
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));


//Cloudinary Endpoints 
app.get('/api/upload', cloudinary.upload);

//User Endpoints 
app.post('/api/login', user.login);
app.post('/api/register', user.register);

//Group Endpoints 
app.get('/api/groups', group.readGroup);
app.post('/api/groups', group.createGroup);
app.put('/api/group/:id', group.updateGroup);
app.delete('/api/group/:id', group.deleteGroup);
app.patch('/api/group/:id/add_member', group.addMember);
app.patch('/api/group/:id/remove_member', group.removeMember);

//Event Endpoints
app.get('/api/events', event.readEvent);
app.post('/api/events', event.createEvent);
app.put('/api/event/:id', event.updateEvent);
app.delete('/api/event/:id', event.deleteEvent);

//Chat Endpoints
app.get('/api/chats', chat.readChat);
app.post('/api/chats', chat.createChat);

///Server listening on port 4000.
app.listen(4000, () => console.log('Listening on Port: 4000'));