const nodemailer = require('./nodemailer_controller');
module.exports = {
    readUsers(req, res) {
        //Assign the db variable to the request app get database folder.
        const db = req.app.get('db');
        //Get the users from the database
        db.read_admin_users().then(users => {
            //Send the users to the frontend.
            res.status(200).json({users});
        }).catch(err => console.log('Admin Users Database Error-------------', err));
    },
    deleteUser(req, res) {
        //Assign the db variable to the request app get database folder
        const db = req.app.get('db');
        //Destruct the id from the req.params
        const { id } = req.params;
        //Destruct the name, email, id from the req.body.
        const { email, reason, username } = req.body;
        //Send notification to user, using nodemailer controlller.
        nodemailer.sendDeleteNotification(email, username, reason);
        //Have a setTimeout for after a day.
        // setTimeout(() => {
        db.delete_user(id).then(users => {
            //Send a status of 200. and the users. and message.
            res.status(200).json({users, message: 'user deleted!!'});
        }).catch(err => console.log('Delete User Database Error----------', err));
        // }, 1000 * 60 * 24);
        // clearTimeout();
    },
    warnUser(req, res) {
      //No need for a database instance sicne you are just sending  a warning to user and not altering database.
      const { username, email, reason } = req.body;
      nodemailer.sendWarningNotification(email, username, reason)
      res.status(200).json({message: 'Warning Sent'});
    },
    deleteEvent(req, res) {
        //Assign the db variable to the request app get database folder
        const db = req.app.get('db');
        //Destruct the id from the req.params
        const { id } = req.params;
        //Reason
        const { reason } = req.body;
        db.get_event_admin(id).then(users => {
            //Send notification to user, using nodemailer controlller.
            nodemailer.sendDeleteEventNotification(users[0].email, reason);
        }).catch(err => console.log('Get Group Admin Error---------', err));
        //Have a setTimeout for after a day.
        // setTimeout(() => {
        db.delete_admin_event(id).then(events => {
            //Send a status of 200. and the events. and message.
            res.status(200).json({events, message: 'user deleted!!'});
        }).catch(err => console.log('Delete User Database Error----------', err));
        // }, 1000 * 60 * 24);
        // clearTimeout();
    },
    deleteGroup(req, res) {
        //Assign the db variable to the request app get database folder
        const db = req.app.get('db');
        //Destruct the id from the req.params
        const { id } = req.params;
        //Reason
        const { reason } = req.body;
        db.get_group_admin(id).then(users => {
            //Send notification to user, using nodemailer controlller.
            nodemailer.sendDeleteGroupNotification(users[0].email, reason);
        }).catch(err => console.log('Get Group Admin Error---------', err));
        //Have a setTimeout for after a day.
        // setTimeout(() => {
        db.delete_admin_group(id).then(groups => {
            //Send a status of 200. and the groups. and message.
            res.status(200).json({groups, message: 'user deleted!!'});
        }).catch(err => console.log('Delete User Database Error----------', err));
        // }, 1000 * 60 * 24);
        clearTimeout();
    }
}