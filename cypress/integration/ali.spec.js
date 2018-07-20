const createEventUrl = 'http://localhost:3000/dashboard/create_event';
const loginUrl = 'http://localhost:3000/login';
//D
describe('Should Go to blah blah', () => {
    //beforeEach takes a callback, and runs the function before the test.
    beforeEach(function(){
        cy.visit('/login')
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.login-div > div:first-child > div > input').type('patroits_4ever');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.login-div > div:nth-child(2) > div > input').type( '1234');
        cy.get('.login-div > button').click();
        cy.request('POST', 'http://localhost:4000/api/login', {
            username: 'patroits_4ever',
            password: '1234'
        })
    })

    it('create the event', () => {
        //beforeEach takes a callback, and runs the function before the test.
        beforeEach(function(){
            cy.visit('/dashboard/create_event')
        })
        cy.visit('/dashboard/create_event');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-event-form > select').select('Portland Meetup');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-event-form > .create-event-name-div > div > input').type('Test Event Name');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-event-form > .create-event-topic-div > div > input').type('Test Event Topic');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-event-form > .create-event-date-div > div > input').type('Test Event Date');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-event-form > .create-event-location-div > div > input').type('Test Location');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-event-form > .create-event-add-attendee-div > div > input').type('Test Add Attendee');
        cy.get('.create-event-form > .create-event-button').dblclick();
        // seed a post in the DB that we control from our tests
        //cy.requst does a request with the data you want to use, and the url.
        cy.request('POST', 'http://localhost:4000/api/events', {
            eventName: 'Test Event Name',
            eventTopic: "Test Event Topic",
            eventImage: 'http://www.flexibleproduction.com/wp-content/uploads/2017/06/test-intelligenza-sociale.jpg',
            eventDate: '07/29/2017',
            eventLocation: 'Las Vegas, NV',
            groupId: 39
        });
    });
})
describe('Test component did mount!', () => {
    //beforeEach takes a callback, and runs the function before the test.
    beforeEach(function() {
        cy.visit('/events');
    })
    
    it('Checks how many items are in event search page', () => {
        cy.get('div > .event-search-div').children('.eventCard-parent');
        cy.request('GET', 'http://localhost:4000/api/events/search', {
            eventName: 'First Event',
            eventTopic: "Event!!",
            eventImage: 'afsds',
            eventDate: 'aasf',
            eventLocation: 'Location',
            groupId: 39
        });
    })
})