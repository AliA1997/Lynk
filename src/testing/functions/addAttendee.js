module.exports = {

    event_attendees:[
        {
            id: 1,
            name: 'Paul'
        },
        {
            id: 2,
            name: 'Ali'
        },
        {
            id: 3,
            name: 'Bryson'
        },
        {
            id: 4,
            name: 'Brent'
        }
    ],

    addAttendee(){
        this.event_attendees.push({
            id: 5,
            name: 'Anthony'
        }) 
        return this.event_attendees;
    }
}

