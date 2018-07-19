module.exports = {
    events: [
        {
            id: 1,
            name: 'Lebron James is the Goat',
            topic: 'basketball'
        },
        {
            id: 2,
            name: 'Kobe Bryant is the Goat',
            topic: 'basketball'
        },
        {
            id: 3,
            name: 'Michael Jordan is the Goat',
            topic: 'basketball'
        },
        {
            id: 4,
            name: 'Chris Paul homecoming.',
            topic: 'basketball'
        }
    ],
    removeEvent(name) {
        let indexOfEventToRemove = this.events.findIndex(event => event.name === name);
        this.events.splice(indexOfEventToRemove, 1);
        console.log(this.events);
        return this.events;
    }
}