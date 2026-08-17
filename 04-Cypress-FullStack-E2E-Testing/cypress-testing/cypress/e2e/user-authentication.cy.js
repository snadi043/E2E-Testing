describe('Test suite for user authentication e2e userflow testing.', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });

    it('should register the user and pass the tests by having the session cookie value.', () => {
        cy.visit('/signup');
        cy.get('[data-cy="auth-email"]').click();
        cy.get('[data-cy="auth-email"]').type('test@testing.com');
        cy.get('[data-cy="auth-password"]').click();
        cy.get('[data-cy="auth-password"]').type('testing321');
        cy.get('[data-cy="auth-submit"]').click();
        cy.location('pathname').should('eq', '/takeaways');
        cy.getCookie('__session').its('value').should('not.be.empty')
    });

    it('should logout the registered user after the user logged with their credentials.', () => {
        cy.login();

        cy.contains('Logout').click()
        cy.location('pathname').should('eq', '/');
        cy.getCookie('__session').its('value').should('be.empty')

    });
});