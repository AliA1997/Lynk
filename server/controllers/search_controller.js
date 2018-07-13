module.exports = {
    searchEvent(req, res) {
        //Assign a variable to the database isntance.
        const db = req.app.get('db');
        //If the req.query has a search property 
        if(req.query.search) {
            //Destruct the search property from the request query.
            const { search } = req.query;
            //Do a database call....
        } else {
            //Else return all the events limited by 10.
            db.read_all_events().then(events => {
                //Return a status code of 200 and the events.
                res.status(200).json({events});
            }).catch(err => console.log('Read all events database error--------------', err));
        }
    },
    searchGroup(req, res) {
        //Assign a variable to a database instance.
        const db = req.app.get('db');
        //If the req.query has a search property
        if(req.query.search) {
            //Destruct the search property from the request query.
            const { search } = req.query;
            //Do a database call...........
        } else {
            //Else return the grups limited by 10.
            db.read_groups().then(groups => {
                //Return a status code of 200 and the groups.
                res.status(200).json({groups});
            }).catch(err => console.log('Read all groups database error----------', err));
        }
    }
}