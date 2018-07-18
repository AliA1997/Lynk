//Used to hash
const bcrypt = require('bcryptjs');
//Use the uuid to 
//THe amount of times your hashing it.
const saltRounds = 12;
//Import the nodemailer controller in order to send a verification email to the user's email.
const nodemailer = require('./nodemailer_controller');
//Import the uuid that will generate a verification link.
const uuid = require('uuid');
///Exporting the object with the methods.   
module.exports = {
    readUserData(req, res) {
        //Read the data from the req.session.user
        res.status(200).json({user: req.session.user});
    },
    login(req, res) {
    // Destructuring username and password from req.body
       const { username, password } = req.body;
    // Setting db to requests database folder(?)
       const db = req.app.get('db');

       // Running find_user sql file and passing username as argument
       db.find_user(username).then(users => {
           // Returning users and comparing userdata and password if users length is more than zero.
           if(users.length){
            console.log('users---------', users); 
               const userData = users[0];
               bcrypt.compare(password, userData.password).then(doPasswordsMatch => {
                // If password matches, deleting password and setting req.session.user to userData.  Return status 200 and user data if successful.   
                if(doPasswordsMatch){
                       delete userData.password;
                       req.session.user = userData;
                       req.session.save();
                       res.status(200).json({user: req.session.user})
                   }
               }).catch(err => console.log(err, 'Bcrypt compare error')) 
               // Else returning failed login message.
           } else {
               res.status(404).json({message: '404 login failed'})
           }
       }).catch(err => console.log(err, 'find_user database error'))
    },
    
    register(req, res) {
        //Destructuring name, username, email, password, age from req.body
        const{ name, username, email, password, profile_picture, age } = req.body;
        //Setting db to requests database folder(?)
        const db = req.app.get('db');
        const verification_link = uuid.v4();
        bcrypt.hash(password, saltRounds).then(hashedpassword => {
            //Creating newUser variable containing name, username, email, password, age
            const newUser = {name, username, email, profile_picture, password: hashedpassword, age, verification_link };
            //Running register sql file and passing newUser as argument
            db.register(newUser).then(user => {
                req.session.user = user[0];
                nodemailer.sendVerificationMail(user[0].username, user[0].email, verification_link);
                //Save the session.
                req.session.save();
                res.status(200).json({user: req.session.user});
            }).catch(err => console.log(err, "Register error"))
        }).catch(err => console.log(err, "Hashing error"))
    },
    //Verifies email via a patch.
    verifyEmail(req, res) {
        //Get the id from the session.
        const { id } = req.session.user;
        //Assign a variable to the database instance 
        const db = req.app.get('db');
        //Run the verify email sql file.
        db.verify_email(id).then(emailVerified => {
            res.status(200).json({message: 'Email Verified'});
        }).catch(err => console.log('Verify Email Error-----------', err));
    }
}