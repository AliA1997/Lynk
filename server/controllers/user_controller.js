//Used to hash
const bcrypt = require('bcrypt');
//THe amount of times your hashing it.
const saltRounds = 12;
///Exporting the object with the methods.   
module.exports = {
    login(req, res) {
    // Destructuring username and password from req.body
       const { username, password } = req.body;
    // Setting db to requests database folder(?)
       const db = req.app.get('db');

       // Running find_user sql file and passing username as argument
       db.find_user(username).then(users => {
           // Returning users and comparing userdata and password if users length is more than zero.
           if(users.length){
               const userData = users[0];
               bcrypt.compare(password, userData.password).then(doPasswordsMatch => {
                // If password matches, deleting password and setting req.session.user to userData.  Return status 200 and user data if successful.   
                if(doPasswordsMatch){
                       delete userData.password;
                       req.session.user = userData;
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

    }
}