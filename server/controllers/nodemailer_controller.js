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
                    <a href="${window.location.origin}/${verificationLink}" style={color: indigo, text_decoration: none}>Verify Account</a>
                  </div>
            `
        }
    }
 }


// nodemailer.createTestAccount((err, account) => {
//     // create reusable transporter object using the default SMTP transport
//     let transporter = nodemailer.createTransport({
//         host: 'smtp.ethereal.email',
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//             user: account.user, // generated ethereal user
//             pass: account.pass // generated ethereal password
//         }
//     });

//     let mailOptions = {
//         from: '"Fred Foo 👻" <foo@example.com>', // sender address
//         to: 'bar@example.com, baz@example.com', // list of receivers
//         subject: 'Hello ✔', // Subject line
//         text: 'Hello world?', // plain text body
//         html: '<b>Hello world?</b>' // html body
//     };

//     // send mail with defined transport object
//     transporter.sendMail(mailOptions, (error, info) => {
//         if (error) {
//             return console.log(error);
//         }
//         console.log('Message sent: %s', info.messageId);
//         // Preview only available when sending through an Ethereal account
//         console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

//         // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
//         // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
//     });
// });
