const attendee = require('./addAttendee');



test('attendee test length', () => {
    let attendees = attendee.event_attendees;
    const objectToAdd = {
        id: 5,
        name: 'Anthony'
    }
    attendees = attendee.addAttendee();
    
    expect(attendees).toContainEqual(objectToAdd)
});

