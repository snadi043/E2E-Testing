import 'cypress-real-events';

describe('Testing the landing page for the ', () => {
  it('should render the landing page on the port 5173 with all the basic elements in the header.', () => {
    cy.visit('http://localhost:5173');
    cy.get('header').contains('Cypress Demo');
    cy.get('nav li').first('Home');
    cy.get('nav li').last('About');
  });

  it('should render the page title on the home page within the main element in the DOM.', () => {
    cy.visit('http://localhost:5173');
    cy.get('div.center').should('have.text', 'Home Page')
  });

  it('should have the expected nav links and when hovered display the expected styles.', () => {
    cy.visit('http://localhost:5173');
    cy.get('[data-cy="header-home-link"]').should('have.text', 'Home');
    // Since there is no real built-in cypress method to mock hover functionality new cypress package "cypress-real-events" has to installed to simulate the functionality.
    cy.get('[data-cy="header-home-link"]').realHover(); 
    cy.get('[data-cy="header-about-link"]').should('have.text', 'About');
  });

  it('should simulate the navigation flow when clicked on the nav links and using the browser UI.', () => {
    cy.visit('http://localhost:5173');
    
    cy.get('[data-cy="header-home-link"]').click();
    cy.visit('http://localhost:5173');

    cy.get('[data-cy="header-about-link"]').click();
    // location and go are the cypress methods to test the navigation functionalities of the application.
    cy.location('pathname').should('eq', '/about');
    cy.go('back').location('pathname').should('eq', '/');
  });
});