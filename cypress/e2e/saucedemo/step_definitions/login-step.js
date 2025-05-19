import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const url = Cypress.env('base_url');
 

Given("I open the SauceDemo login page", () => {
  cy.visit(url);
});


When("I enter the username {string} and password {string}", (username, password) => {
  cy.get("#user-name").clear().type(username);
  cy.get("#password").clear().type(password);
});


When("I click the login button", () => {
  cy.get("#login-button").click();
});



//  Scenario: Successful login with valid credentials

Then("I should be redirected to the product page", () => {
  
  // =========    Verify success login    ==========
        
  // verify URI is correct
  cy.url().should('include', '/inventory.html');

  // verify app logo
  cy.get('.app_logo').should('have.text', 'Swag Labs');

  // verify burger menu is visible
  cy.get('#react-burger-menu-btn').should('be.visible');

  // verify shopping cart is visible
  cy.get('.shopping_cart_link').should('be.visible');

  // verify product sort is visible
  cy.get('.product_sort_container').should('be.visible');

});



// Scenario: Unsuccessful login with invalid credentials

Then("I should see an error message", () => {

  // =========    Verify failed login    ==========

  cy.get('[data-test="error"]').should(
    "contain",
    "Epic sadface: Username and password do not match any user in this service"
  );
});

