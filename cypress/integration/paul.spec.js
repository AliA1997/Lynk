const createGroupUrl = 'http://localhost:3000/dashboard/create_group';
// const loginUrl = 'http:/localhost:3000/login';
// describe('Should go to the create_group url, and CreateGroup component.', () => {
//     it('should be in correct url and should have the Create Group title-------', () => {
//         cy.visit(createGroupUrl);
//         cy.get('.create_group-div > h4')
//     })
// })


describe('Create Group component', () => {
    it('focuses input on load of create group page', () => {
        cy.visit(createGroupUrl)

        cy.get()
          .should('have.class', 'create-group-name')

    })
})
