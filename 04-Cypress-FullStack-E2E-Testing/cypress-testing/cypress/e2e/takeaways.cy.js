/// <reference types="Cypress" />

describe('Takeaways', () => {
  beforeEach(() => {
    // The purpose of the task method is to handle the testing of use cases where the testing is irrespective of browser.
    // In this case the tests are regarding the testing database which doesnot run in the browser and to simulate such 
    // tasks cypress offeres the task().
    // The task() method takes an argument which is name of the task that has to be implemented.
    // These task('seedDatabase') is configured in the 'cypress.config.js' to register the event.
    cy.task('seedDatabase');
  })
  it('should display a list of fetched takeaways', () => {
    cy.visit('/');
    cy.get('[data-cy="takeaway-item"]').should('have.length', 2);
  });
});