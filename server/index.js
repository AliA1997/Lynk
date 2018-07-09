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