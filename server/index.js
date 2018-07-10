//Configuring our env file.
require('dotenv').config();
//Initializes the server
const express = require('express');
//
//Middlewares   
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

//


///Define the server 
const app =  express();
//

//User Endpoints 
app.post('/api/login', user.login);
app.post('/api/register', user.register);

///Server listening on port 4000.
app.listen(4000, () => console.log('Listening on Port: 4000'));