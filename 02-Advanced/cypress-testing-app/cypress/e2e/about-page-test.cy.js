/// <reference types="Cypress" />

describe('Tests for the About Page', () => {
    beforeEach(() => {
        cy.visit('/about');
    });

    it('should render the About page and have the About Us header.', () => {
        cy.get('header.center').first().contains('About Us');
    });

    it('should have the form with the heading Contact Us.', () => {
        cy.get('h2.center').contains('Contact Us');
        cy.get('label').should('have.attr', 'for', 'message').contains('Your Message');
        cy.get('#message').type('Contact Us Form Message.');

        cy.get('._row_167to_29 > :nth-child(1) > label').contains('Your Name');
        // cy.get('label').should('have.attr', 'for', 'name').contains('Your Name');
        cy.get('#name').type('Contact Us Form Name.');

        // This element selector is taken from the cypress UI suggestions.
        cy.get('._row_167to_29 > :nth-child(2) > label').contains('Your Email');
        // {enter} -> adding {enter} after the value in the type() makes use of hitting the "enter" button on the keyboard.
        // This can be used to test the accessibility of the user to utilize the alternative ways to use the mouse events.
        cy.get('#email').type('youremail@email.com{enter}');

        cy.get('[data-cy="contact-btn-submit"]').should('have.text', 'Send Message');
        cy.get('[data-cy="contact-btn-submit"]').should('not.have.attr', 'disabled');

        // Alias in cypress is a optimized way to avoid repetition in fetching the DOM elements.
        // Here, the contact-btn-submit is being used multiple times using the "data-cy" attribute.
        // This can be replaced with alias and accessing the alias using @{alias} and then use the chainers as usual.
        cy.get('[data-cy="contact-btn-submit"]').as('contactSubmitBtn');

        cy.get('@contactSubmitBtn').click();

        // In Cypress, the default chainers can also be replaced using the then() method and calling the internal DOM elements
        // using the arrow functions within then() method.
        // when using the then() the assertions cannot be made with the should() but can be done using the regular imiplict keywords.
        cy.get('@contactSubmitBtn').then((el) => {
            expect(el[0]).to.have.attr('disabled')
            expect(el[0]).to.have.text('Sending...')
        });
    });
});