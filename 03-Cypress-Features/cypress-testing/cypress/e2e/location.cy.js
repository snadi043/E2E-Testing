/// <reference types="cypress" />

describe('share location', () => {
  beforeEach(() => {
    // It is a best practise to usually initiate the clock in beforeEach method. 
    cy.clock()
    // In Cypress Fixtures is a feature to optimize the dynamic or data which is to be used repetatively in the test cases of the application.
    // To integrate "fixtures" in the cypress testing application "fixture" method is used which has to be defined with the 'fixture' data json file.
    // Inorder to access the fixture data an alias is to be given to the fixture file so it can be used in multiple locations of the testing file.
    cy.fixture('user-location.json').as('userLocationFixture');
    cy.visit('/').then((win) => {
      cy.get('@userLocationFixture').then((fixtureData) => {
        // stub() method takes two arguments (name of the function that has to be mocked, the object of the function that is being mocked.) 
        // with stub() you can also, use chainners which are used to simulate the complete flow.
        // Here, the user flow goes in such a way that, the browser geoLocation feature has to fetch the user location which has the properties 
        // of the cooridnate object as latitude and longitude and this process is handled using callbacks by the browser within particular time.
          cy.stub(win.navigator.geolocation, 'getCurrentPosition')
            .as('userCurrentPosition')
            .callsFake((cb) => {
              setTimeout(() => {
                cb(fixtureData);
              }, 150);
            })
        });

      // this stub is designed to make the mocking for the browser navigation clipboard, which is displays the message on the screen.
      cy.stub(win.navigator.clipboard, 'writeText').as('getClipboardText').resolves();
      // implementing the use of spies 
      cy.spy(win.localStorage, 'setItem').as('savedUserLocation');
      cy.spy(win.localStorage, 'getItem').as('fetchUserLocation');
      });
  });
  
  it('should render the location application on the port 5173', () => {
    cy.visit('/');
  });

  it('should render the user location by using the cypress custom stub to simulate the browser geoLocation functionality.', () => {

    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('@userCurrentPosition').should('be.called');
    cy.get('[data-cy="get-loc-btn"]').should('have.attr', 'disabled');
    cy.get('[data-cy="actions"]').contains('Location fetched!')
  });

  it('should be able to render the status message when the username is entered and clicked on get location button.', () => {
    cy.get('[data-cy="name-input"]').type('Dave Mitchel');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="actions"]').contains('Location fetched!');
  });

  it('should be able to share the location link and dispaly the message on the clipboard.', () => {
    cy.get('[data-cy="name-input"]').type('Dave Mitchel');
    cy.get('[data-cy="get-loc-btn"]').click();
    cy.get('[data-cy="actions"]').contains('Location fetched!');
    cy.get('[data-cy="share-loc-btn"]').click();
    cy.get('@getClipboardText').should('have.been.called');

    cy.get('[data-cy="info-message"]').should('have.class', 'visible');
    cy.get('[data-cy="info-message"]').children('p').should('be.visible');

    // This is the test case that expands the functionality of the stub 'getClipboardText' to expect it has to be matched with the
    // data and infoText and once the proper data is passed to the storedUrl has to generate the location link.
    // So here, the parameter/arguments of a function can be expected using the assertion 'calledWithMatch' and handling it with "RegExp"
    
    // In this test case, the fixture is used to extract the data from the coords object and injected into the RegExp to make use of fixture dynamic data.
    cy.get('@userLocationFixture').then((fixtureData) => {
      const {latitude, longitude} = fixtureData.coords;
      cy.get('@getClipboardText').should('have.been.calledWithMatch', new RegExp(`${latitude}.*${longitude}.*${encodeURI('Dave Mitchel')}`));

      cy.get('@savedUserLocation').should('have.been.calledWithMatch', 
        'Dave Mitchel',
        new RegExp(`${latitude}.*${longitude}.*${encodeURI('Dave Mitchel')}`) 
      );
    
      cy.get('[data-cy="share-loc-btn"]').click()
      cy.get('@fetchUserLocation').should('have.been.calledWithMatch', 'Dave Mitchel');

      // If you are generally testing that the clipboard has to be gone from the UI, it has to happen within 4s,
      // which is the default timer that the cypress will wait for any test case to fail.
      // So, even after the 4s if the test doesnt pass then cypress throws a failing error.
      // But, let's say if most of the application test cases has to deal with timers and of cypress has to wait for more time
      // to continue with the next test which has to deal with timer again it can fail. 
      // So, the alternative workaround for this is to use clock() cypress offers to manually change the timer in your test cases.
      cy.tick(2500);
      cy.get('[data-cy="info-message"]').children('p').should('not.be.visible');
    });
  });

  it('should render the validation message when the share link button is clicked without user name.', () => {
    cy.get('[data-cy="name-input"]').type('{backspace}');
    cy.get('[data-cy="get-loc-btn"]').click()
    cy.get('[data-cy="info-message"]').children('p').should('have.text', 'Please enter your name and get your location first!');
  });

  // In the app, the user flow is designed in such a way that, once the get location button is clicked the button goes disabled 
  // and displays a spinner until it fetches the user location.
  // The spinner is the indication that it takes sometime to complete the process and behind the scenes, it is the geoCurrentLocation()
  // which has callback function to finish in order to fetch the result of the user location.
  // So, this flow can be tested by checking if the button has the disable attribute when its clicked.
});


// stubs in cypress are nothing but the process of replacing the exisiting functionalities of a browser or a third party packages in your application.
// As a basic thumbrule, it is not in your scope to test these browser or thrid party functionalities in your application testing.
// But, since you are using these features in your application you are responsible to simulate the process whether the utilized browser or third-party features are 
// intended the way you expect them to work in your browser.

// spies -> Spies in cypress is another feature used when you have to test whether a function from the broser/ third-party package is triggered or being called.
// Because, sometimes it is also not necessary to verify the simulation of these features which can be overhead but checking whether those methods/functions are 
// called/triggered is atleast mandatory.