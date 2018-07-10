//Configuring our env file.
require('dotenv').config();
//Initializes the server
const express = require('express');
//
//Middlewares   
//Initializes the database 
const massive = require('massive');
//Initiallizes the req.body, so without it, the req.body will not be defined.
const bodyParser = require('body-parser');
//Initializes the session
const session = require('express-session');
//
//Connect to database with the connection string from your .env file.
//And configure your server to it.
massive(process.env.CONNECTION_STRING).then(database => {
    //Then assign the database, directory of the sql files to the server.
    app.set('db', database);
}).catch(err => console.log(err, 'Database Connection Error'))
//

//Controller Files 
const user = require("./controllers/user_controller");
const group = require("./controllers/group_controller");
const event = require("./controllers/event_controller");
const cloudinary = require("./controllers/cloudinary_controller");
const nodemailer = require("./controllers/nodemailer_controller");
//


///Define the server 
const app =  express();


//Initialize the req.body, since we want req.body in accessible for every endpoint we will use app.use.
app.use(bodyParser.json());

//We want the req.session to be accessible in every endpoint.
app.use(session({
    //Use the session secret in env
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    //Set the age of the cookie
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 14
    }
}));
//

//Cloudinary Endnpoints 
app.get('/api/upload', cloudinary.upload)
//User Endpoints 
app.post('/api/login', user.login);
app.post('/api/register', user.register);

//Group Endpoints
app.get('/api/groups', group.readGroup);
app.post('/api/groups', group.createGroup);
app.put('/api/group', group.updateGroup);
app.delete('/api/group', group.deleteGroup);

//Event Endpoints 
app.get('/api/events', event.readEvent);
app.post('/api/events', event.createEvent);
app.put('/api/event', event.updateEvent);
app.delete('/api/event', event.deleteEvent);


///Server listening on port 4000.
app.listen(4000, () => console.log('Listening on Port: 4000'));