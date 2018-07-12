
module.exports = {

    createEvent(req, res){
        //Destructuring event_name, event_topic, event_date, event_location, event_attendee_list, group_id from req.body
        const{ event_name, event_topic, event_date, event_location, event_attendee_list, group_id } = req.body;
        const event_image = 'Test 1';
        //Setting db to requests database folder(?)
        const db = req.app.get('db');
        let event_image = 'FUck you!!!!!!!!!!!!!!!!!!';
        //Setting new event object to newEvent variable
<<<<<<< HEAD
        const newEvent = { event_name, event_topic, event_date, event_image, event_location, event_attendee_list, group_id };
=======
        const newEvent = { event_name, event_topic, event_image, event_date, event_location, event_attendee_list, group_id };
>>>>>>> 7ffdab2be542ab12a203da3c997fc36284a2ddc1
        db.create_event(newEvent).then(events => {
            console.log('events--------', events);
            res.status(200).json({events})
        }).catch(err => console.log(err, 'Create event error'))
    },

    updateEvent(req, res){
        //Destructuring event_name, event_topic, event_date, event_location, event_attendee_list from req.body
        const{ id, event_name, event_topic, event_date, event_location, event_attendee_list } = req.body;
        const event_image = 'Test2';
        //Setting db to requests database folder(?)
        const db = req.app.get('db');
        //Setting updated event to updatedEvent variable
        const updatedEvent = { group_id: id, event_name, event_topic, event_date, event_image, event_location, event_attendee_list };

        db.update_event(updatedEvent).then(updatedEvent => {
            console.log("Upded---------------event--------", updatedEvent);
            res.status(200).json({event: updatedEvent})
        }).catch(err => console.log(err, 'Update event error'))

    },

    deleteEvent(req, res){
        //Destructuring event id from req.body
        const{ id } = req.body;
        //setting db to requests database folder(?)
        const db = req.app.get('db');
        

        db.delete_event(id).then(event => {
            res.status(200).json({event})
        }).catch(err => console.log(err, 'Delete event error'))

    },

    readEvent(req, res){
        const db = req.app.get('db');

        db.read_all_events().then(events => {
            res.status(200).json({events})
        }).catch(err => console.log(err, 'Read events error'))
        
    }

}


