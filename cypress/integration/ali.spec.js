const createEventUrl = 'http://localhost:3000/dashboard/create_event';
const loginUrl = 'http://localhost:3000/login';
describe('Should go to the create_group url, and CreateEvent component.', () => {
    it('should be in correct url and should have the Create Event title-------', () => {
        cy.visit(createEventUrl);
        //When using the get method, can use css selectors.
        cy.get('.create-event-div > h4').contains('Create Event');
    })
});
describe('Check if a event is created', () => {
    it('login first', () => {
    //First Login 
        cy.visit(loginUrl);
        cy.get('.login-div > div:first-child > div > input').type('patroits_4ever');
        cy.get('.login-div > div:nth-child(2) > div > input').type('1234');
        cy.get('.login-div > button').click();
        cy.server().route('POST', '/api/login', {username: 'patroits_4ever', password: '1234'});
    });
    it('create the event', () => {
        cy.visit(createEventUrl);
        // cy.get('.create-event-form > select').select('')
        // cy.get('.create-event-form > div:first-child > div > input').type('Test Event Name');
    });
})