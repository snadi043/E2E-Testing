describe('Simulating the process of "Add Task" from the homepage and closing it.', () => {
    it('should render the homepage and when clicked on the "Add Task" button should open the Modal.', () => {
        cy.visit('http://localhost:5173');
        cy.get('#task-control button').click();
        cy.get('#root').children('dialog');
        cy.get('.backdrop').click({force: true});
        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should close the modal when the cancel button is clicked.', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-cy="start-add-task-button"]').click()
        cy.get('.modal').find('[data-cy="cancel-button"]').click()
    });

    it('should be able to add a new task with all the input fields typed and once submited should display the task on the index page.', () => {
        cy.visit('http://localhost:5173');
        cy.get('[data-cy="start-add-task-button"]').click()

        cy.get('.modal').contains('Title')
        cy.get('[data-cy="title"]').type('My Task Title');

        cy.get('.modal').contains('Summary')
        cy.get('[data-cy="summary"]').should('not.be.disabled');
        cy.get('[data-cy="summary"]').type('My Task Title');

        cy.get('.modal').contains('Category');
        cy.get('[data-cy="category"]').select('low').should('have.value', 'low');

        cy.get('p.actions').contains('Add Task').should('have.attr', 'type', 'submit').click()

        cy.get('main li').should('have.length', 1);
        cy.get('main li').find('div>h2').contains('My Task Title');
        cy.get('main li').find('div>p').contains('My Task Title');

        cy.get('.backdrop').should('not.exist');
        cy.get('.modal').should('not.exist');
    });

    it('should render the error message element on the index page if add-task is submmitted empty.', () => {
        cy.visit('http://localhost:5173');
        cy.get('button').contains('Add Task').click();
        cy.get('.modal').find('[data-cy="add-task-button"]').click()
        cy.get('p.error-message').contains('Please provide values for task title, summary and category!');
    });

    it('should allow to filter the tasks from the index page and display them accordingly.', () => {
        cy.visit('http://localhost:5173');

        cy.get('[data-cy="start-add-task-button"]').click()


        cy.get('[data-cy="title"]').type('My Task Title');
        cy.get('[data-cy="summary"]').type('My Task Title');
        cy.get('#category').select(3).should('have.value', 'low');
        cy.get('[data-cy="add-task-button"]').click()


        cy.get('#filter').select('low');
        cy.get('main li').should('have.length', 1);
        cy.get('#filter').select('all');
        cy.get('main li').should('have.length', 1);
        cy.get('#filter').select('urgent');
        cy.get('main li').should('have.length', 0);
    });

    it('should render all the list of tasks and in the order as expected.', () => {
        cy.visit('http://localhost:5173');
        
        cy.get('[data-cy="start-add-task-button"]').click()


        cy.get('[data-cy="title"]').type('My Task 1');
        cy.get('[data-cy="summary"]').type('My Summary 1');
        cy.get('#category').select(3).should('have.value', 'low');
        cy.get('[data-cy="add-task-button"]').click()

        cy.get('[data-cy="start-add-task-button"]').click()

        cy.get('[data-cy="title"]').type('My Task 2');
        cy.get('[data-cy="summary"]').type('My Summary 2');
        cy.get('#category').select(0).should('have.value', 'urgent');
        cy.get('[data-cy="add-task-button"]').click()

        cy.get('ul li:first').contains('My Task 1')
        cy.get('ul li:last').contains('My Task 2')
    });
})