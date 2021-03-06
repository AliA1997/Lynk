
module.exports = {

    createEvent(req, res){
        //Destructuring event_name, event_topic, event_date, event_location, event_attendee_list, group_id from req.body
        const{ eventName, eventTopic, eventImage, eventDate, eventLocation, eventAttendeeList, groupId } = req.body;
        //Setting db to requests database folder(?)
        const db = req.app.get('db');
        //Setting new event object to newEvent variable
        const newEvent = { event_name: eventName, event_topic: eventTopic, event_date: String(eventDate),
             event_image: eventImage, event_location: eventLocation, event_attendee_list: eventAttendeeList, group_id: +groupId };
        console.log('newEvent---------------', newEvent);
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

    readEvents(req, res){
        const db = req.app.get('db');

        db.read_all_events().then(events => {
            res.status(200).json({events})
        }).catch(err => console.log(err, 'Read events error'))
        
    },
    
    readEvent(req, res){
        const db = req.app.get('db');
        const { id } = req.params;
        console.log('id__------------', id);
        db.read_event(id).then(event => {
            console.log(event);
            res.status(200).json({event})
        }).catch(err => console.log(err, 'Read event error'))
    },
    readUserAdminEvents(req, res){
        //Assign a db variable 
        const db = req.app.get('db');
        //Destruct id from the req.params
        const { id } = req.params;
        //
        //
        db.read_user_admin_events(id).then(events => {
            res.status(200).json({events})
        }).catch(err => console.log(err, 'Read Admin Groups errror----------------'));
    },
    readUserEvents(req, res){
        //Assign to a db variable   
        const db = req.app.get('db');
        //Destruct the id from the req.params;
        const { id } = req.params;
        //
        //
        db.read_user_events(id).then(events => {
            res.status(200).json({events});
        }).catch(err => console.log(err, 'Read User Groups Error----------'));
    },
    addAttendee(){
        const db = req.app.patch('db');
        const { id } = req.params;
        const { attendee } = req.body

        const event_attendee = {
            attendee,
            id
        }
        db.add_attendee(event_attendee).then(event => {
            res.status(200).json({event})
        }).catch(err => console.log(err, "Add attendee error"))
    },
    removeAttendee(){
        const db = req.app.patch('db');
        const {id} = req.params;
        const { attendee } = req.body;

        db.delete_attendee(event_attendee).then(event => {
            res.status(200).json({event})
        }).catch(err => console.log(err, 'Delete Attendee error'))
    }

}


