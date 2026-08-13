/// <reference types="Cypress" />

// The "describe" method take in two arguments.
// - 1. Is the name or a string which explains the block of the test for which the test cases are to be created.
// - 2. An anonymous function that calls the cypress to process the individual test cases.

describe('Tests related to the landing page of the Goals Application', () => {
  it('should render the Goals application on the "localhost:5173"', () => {
    // By default, every test suite should start by visiting the site for the remaining tests to run as expeceted.
    cy.visit('http://localhost:5173')
  });

  it('should render the logo and the heading of the application at the top of the page.', () => {
    cy.visit('http://localhost:5173')
    // Explicit expectation (basically should method expects the result in terms of assertions which are explicit way of verifying the tests.)
    cy.get('img').should('have.attr', 'src', '/src/assets/logo.png'); 
    // Implicit expectation - this type of assertions don't expect any results to make the tests process further.
    cy.get('.main-header h1').contains('React Tasks'); 
  });

  // get() -> This is the method that fetches any matching condition that passes from the scope of its selectors.
  // find() -> It is similar to get() but find always has to chain after get(). It cannot go directly fetch the elements.
  // basically, get() fetches the match from the entire DOM elements but find() is more concise after using get() to find the elements and filter on the result.
})