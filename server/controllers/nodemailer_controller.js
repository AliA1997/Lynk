//must require nodemailer in this controller
const nodemailer = require('nodemailer');
//must config dotenv because we are using the variables of node_mailer_email and node_mailer_pass
require('dotenv').config()



module.exports = {
    sendEmail: (req, res) => {
        console.log('body1', req.body)
        const { name, email, text } = req.body
        console.log('req.body', name, email, text)
        // // Generate test SMTP service account from ethereal.email
        // // Only needed if you don't have a real mail account for testing
        let transporter = nodemailer.createTransport({
             service: "gmail",
             auth: {
                 user: process.env.NODE_MAILER_EMAIL,
                 pass: process.env.NODE_MAILER_PASS
                },
                tls: {
                    rejectUnauthorized: false
                }
            })
        console.log('transporter', transporter)
        
        // setup email data with unicode symbols
        let mailOptions = {
            from: name + ' ' + process.env.NODE_MAILER_EMAIL,
            to: process.env.NODE_MAILER_EMAIL,
            subject: 'Comments/Concern',
            text: name + ' ' + email + ' ' + text
        }
        console.log('process.env.NODE_MAILER_EMAIL',process.env.NODE_MAILER_EMAIL)
        transporter.sendMail(mailOptions, (error, info) => {
             if(error){
                 console.log("=======", error)
                 return
             } else {
                 console.log("Message was sent", info)
                 transporter.close()
             }
         })
    },
    sendVerificationMail(username, email, verificationLink) {
        //Assign the transporter variable that is assigned to a new transporter instance initialized via createTransport({})
        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODE_MAILER_EMAIL,
                pass: process.env.NODE_MAILER_PASS
            },
            tls: {
                rejectUnauthorized: false 
            }
        });
        console.log('transporter---------------', transporter);
        //Setup email data with unicode symbols
        let mailOptions = {
            from: process.env.NODE_MAILER_EMAIL,
            to: email,
            subject: 'Verify Account',
            html: `<div>
                    <h1>Welcome ${username}! </h1>
                    <h3>Please Verify Account</h3>
                    <a href="http://localhost:3000/verified/${verificationLink}" style={color: indigo, text_decoration: none}>Verify Account</a>
                  </div>
            `
        }
        //Now send the mail.
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
                console.log('Send Verification Email Error-------------', err);
            } else {
                console.log('mailData------------', data);
                transporter.close();
            } 
        })
    },
    sendDeleteNotification(email, username, reason) {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODE_MAILER_EMAIL,
                pass: process.env.NODE_MAILER_PASS
            },
            tls: {
                rejectUnauthorized: false 
            }
        });
        let mailOptions = {
            from: process.env.NODE_MAILER_EMAIL,
            to: email,
            subject: 'Account to be deleted',
            html: `<div style="color=red">
                    <h1> ${username}! </h1>
                    <h3>Account to be deleted!</h3>
                    <p>For this reason: ${reason}</p>
                  </div>
            `
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
                console.log('Send Delete Notification Email-------------', err);
            } else {
                console.log('Message Send-----------------', data);
                transporter.close();
            }
        })
    },
    sendWarningNotification(email, username, reason) {

        let transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODE_MAILER_EMAIL,
                pass: process.env.NODE_MAILER_PASS
            },
            tls: {
                rejectUnauthorized: false 
            }
        });
        let mailOptions = {
            from: process.env.NODE_MAILER_EMAIL,
            to: email,
            subject: 'Warning about Account Status',
            html: `<div style="background=gold">
                    <h1>Warning ${username}! </h1>
                    <h3>Warning</h3>
                    <p>Warning: ${reason}</p>
                  </div>
            `
        }
        transporter.sendMail(mailOptions, (err, data) => {
            if(err) {
                console.log('Send Warning Notification Email-------------', err);
            } else {
                console.log('Message Sent-----------------', data);
                transporter.close();
            }
        })
    }
 }

