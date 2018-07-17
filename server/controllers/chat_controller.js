module.exports = {

    readChat(req, res) {
    //Destructuring id from req.params
        const{id} = req.params;
    //Setting db to requests database folder(?)
        const db = req.app.get('db');

        db.read_chat(id).then(chat => {
            res.status(200).json({chat})
        }).catch(err => console.log(err, 'Read chat error'))
    },

    createChat(req, res) {
    //Destructuring id, topic, messages, user
        const { topic, messages, users } = req.body
    //Setting db to requests database folder(?)
        const db = req.app.get('db');
    //Setting new chat object to newChat variable
        const newChat = { topic, messages, users };
    
    //Creating new chat and inserting into chat database table. Status 200 if successful, err if failed.
        db.create_chat(newChat).then(chat => {
            res.status(200).json({chat})
        }).catch(err => console.log(err, 'Create chat error'))
    }
}