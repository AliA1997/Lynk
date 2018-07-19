module.exports = {
    events: [
        {
            id: 1,
            name: "Paul's Tees",
            topic: "Baseball"
        },
        {
            id: 2,
            name: "Bryson",
            topic: "Gamers Life"
        },
        {
            id: 3,
            name: "Ali's",
            topic: "Ball is life"
        },
        {
            id: 4,
            name: "Bryce",
            topic: "League vs OverWatch"
        }
    ],
    addEvent(){
        this.events.push({
            id: 5,
            name: "Pual",
            topic: "Making friends"
        })
        return this.events;
    }
}