module.exports = {
    facebookLogin(req, res) {
        //Assign the database instance to a variable.
        const db = req.app.get('db');
        //Destruct the properties from the req.body used to login.
        const { facebookId, name, email, profile_picture } = req.body;
        let id = `facebook | ${facebookId}`;
        let newUser = { id, name, email, profile_picture };
        //RUn the sql file on the db variable.
        db.find_social_media_user(id).then(users => {
            if(users.length) {
                const userData = users[0];
                req.session.user = userData;
                res.status(200).json({message: 'Login Successfully!', user: req.session.user});
            } else {
                db.register_social_media_user(newUser).then(users => {
                    const userData = users[0];
                    req.session.user = userData;
                    res.status(200).json({message: 'Welcome ' + userData.name, user: req.session.user});
                }).catch(err => console.log('register social media error-------------', err));
            }
        }).catch(err => console.log('social-media-user login error-----------------', err));
    },
    googleLogin(req, res) {
        //Assign the database instance to a variable
        const db = req.app.get('db');
        //Destruct the values needed from the req.body
        const { googleId, name, email, profile_picture } = req.body;
        const id = `google | ${googleId}`;
        let newUser = { id, name, email, profile_picture };
        db.find_social_media_user(id).then(users => {
            if(users.length) {
                const userData = users[0];
                req.session.user = userData;
                res.status(200).json({message: 'Login Successfully!', user: req.session.user});
            } else {
                db.register_social_media_user(newUser).then(users => {
                    const userData = users[0];
                    req.session.user = userData;
                    res.status(200).json({message: 'Welcome ' + userData.name, user: req.session.user});
                }).catch(err => console.log('register social media Error-----------------', err));
            }
        }).catch(err => console.log('social media users login error-----------', err));
    }
}