describe('Test suite for testing the add new takeaway user flow', () => {
    beforeEach(() => {
        cy.task('seedDatabase');
    });
    it('should test whether a user is registered.', () => {
        cy.intercept('POST', '/newsletter*', { status: 201 }).as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').click();
        cy.get('[data-cy="newsletter-email"]').type('test@test.com')
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Thanks for signing up!');
    });

    it('should render the validation message when a user is already registered.', () => {
        cy.intercept('POST', '/newsletter*', { message: 'Email already exists' }).as('subscribe');
        cy.visit('/');
        cy.get('[data-cy="newsletter-email"]').click();
        cy.get('[data-cy="newsletter-email"]').type('test@test.com')
        cy.get('[data-cy="newsletter-submit"]').click();
        cy.wait('@subscribe');
        cy.contains('Email already exists');
    });

    it('should add the user to the application when the request is send after clicking the signup button.', () => {
        cy.request(
            {
                url: '/newsletter',
                method: 'POST',
                body: {email: 'test@test.com'},
                form: true
            }
        ).then((res) => {
            expect(res.status).to.be.eq(201);
        });
    });
})