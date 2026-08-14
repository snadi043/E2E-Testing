// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

/// <reference types="Cypress" />

// Creating custom commands to optimize the code repetition in the test cases.
Cypress.Commands.add('getBackdrop', () => { cy.get('.backdrop')});
Cypress.Commands.add('getModal', () => {cy.get('.modal')})

Cypress.Commands.addQuery('getDOMEl', (id) => {
    const getFn = cy.now('get', `[data-cy="{id}"]`);
    return () => {
        console.log(getFn);
        return getFn;
    };
});
