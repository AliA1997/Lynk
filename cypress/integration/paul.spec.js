const createGroupUrl = 'http://localhost:3000/dashboard/create_group';
const loginUrl = 'http:/localhost:3000/login';



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

    it('creat the group', () => {
        //beforeEach takes a callback and runs the function before the test.
        beforeEach(function(){
            cy.visit('/dashboard/create_group')
        })
        cy.visit('/dashboard/create_group');
        //Specify the input you want to type in using css selectors then type into it.
        // cy.get('.create-group-form > select').select('Phoenix Party');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get('.create-group > .create-group-name > div > input').type('Test Group Name');
        //Specify the input you want to type in using css selectors then type into it.
        cy.get( '.create-group-description > div > div > textarea:last-child ').type('Test Group Description');
        
        cy.get('.create-group > div > .add-member-input').type('Test Adding Member');
        cy.get('.create-group > .create-group-button').dblclick();
        
        //need a post in the DB that we control from our tests
        //cy.request does a request with the data you want to use and the url.
        cy.request('POST', 'http://localhost:4000/api/groups', {
            groupName: 'Test Group Name',
            groupDescription: 'Test Group Description',
            groupImage: 'http://pilerats.com/assets/Uploads/_resampled/SetWidth940-pnau-party-14.jpg',
            addMembers: '',


        })

    });

    describe('Testing component did mount', () => {
        //beforeEach takes a callback, and runs the function before the test.
        beforeEach(function() {
            cy.visit('/groups');
        })

        it('Checks how many items are in event search page', () => {
            cy.get('.group-search-div').children('.groupCard-parent');
            cy.request('GET', 'http://localhost:4000/api/groups/search', {
                groupName: 'First Group',
                groupDescription: 'Group Description',
                groupImage: 'fake image',
                groupMembers: ''
            });
        })


    })




})
