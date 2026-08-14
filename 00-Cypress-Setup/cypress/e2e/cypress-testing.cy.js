// Cypress is the testing application for testing the frontend features of the applications.
// Using Cypress, simulation of the user flows can be easily replicated and tested to verify the desired outcomes are achieved.
// Cypress is an open source tool which can be installed using the command, "npm install cypress".
// Cypress also provides developers with its UI tool to view the steps and processes it undergoes when running the test.
// This UI can also become handy to inspect the UI elements using which tesing of DOM elements becomes easier in terms of accessibility.
// Once, cypress is installed using the command "npx cypress open" opens up a window which your application UI is rendered along with
// Chrome or Electron browser for you to configure the cypress testing environment.

// Once, the cypress is installed and configuration is made you can see the cypress folder in which you have "E2E" folder which is responsible
// for your e2e testing functionalites of the application.
// Also, using cypress component testing can also be achieved.

// In order to avoid depreciated errors in react projects to work with cypress, avoid creating the react application with 
// npx create-react-app, because the react team no longer supports the react applications build based on "CRA" library.
// The other and most dependable way is to use "vite" to create react applications.

// Every test file in cypress has the extension "cy.js" and this file is the first test file for this application
// which is "cypress-testing.cy.js".

// So, basically every testing file has a test suite which is in the simple terms binds group of individual test cases under one block.
// Every test suite starts with "describe" method in which you write individual test cases with "cy.{how-you-want-accessing-the-element}""

/// <reference types="Cypress"/> 

describe('basic first test', () => {
  it('should render the site with the port 5173 on the localhost.', () => {
    cy.visit('/');
    cy.get('li').should('have.length', 6);
    cy.get('li').children('span').should('contain', 'Learn how to install & start Cypress');
    cy.get('li').children('span').should('contain', 'Dive into more complex problems - e.g., user authentication testing');
  });
})