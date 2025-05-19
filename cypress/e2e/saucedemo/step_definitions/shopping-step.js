import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import ProductPage from '../page_objects/product-page';
import CheckoutPage from '../page_objects/checkout-page';

const productPage = new ProductPage();
const checkoutPage = new CheckoutPage();

const url = Cypress.env('base_url');
let products;
 

beforeEach(() => { 
  // load the fixture with product data before each test
  cy.fixture("products").then((loadedProducts) => {

    // store the products data
    products = loadedProducts;  
  });
});



// Scenario: Add some products to cart

Given("I am logged in as {string} with password {string}", (username, password) => {
  cy.login(username, password);
});



When("I add 3 products to the cart", () => {
  // check if products were loaded successfully
  expect(products).to.not.be.undefined;


  // loop through all the products in the fixture
  products.forEach((product, index) => {
      // scroll to see product
      productPage.seeProduct(product);
    
      // see product details
      productPage.seeProductDetail(product);

      // add product to cart
      productPage.addProductToCart(product, index); 
  })

});



Then("the cart should contain 3 products", () => {
  // verify quantity of item in shopping cart
  cy.get('[data-test="shopping-cart-badge"]').should('have.text', products.length.toString());

  // save cart data
  cy.saveLocalStorage(); 

});



// Scenario: Successfull checkout
Given("I am on cart page", () => {
  // login
  cy.login('standard_user', 'secret_sauce');

  // restore cart data
  cy.restoreLocalStorage(); 

  // click shopping cart
  cy.get('.shopping_cart_link').click();

  // go to cart page
  checkoutPage.seeCartPage(products);
});


When("I click checkout button", () => {
  // click button Checkout
  cy.get('#checkout').click();
});


When("I enter the checkout information", () => {
  let customerInfo = {
    firstName   : "Jefri",
    lastName    : "Testing",
    postalCode  : "12345"
  }

  // fill in form checkout information
  checkoutPage.checkout(customerInfo);
});


When("I finish the payment", () => {
  // confirm payment
  checkoutPage.payment(products);
});


Then("I should see information of the checkout process is complete", () => {
  // verify page title
  cy.get('[data-test="title"]').should('have.text', 'Checkout: Complete!');

  // verify Complete Image is displayed
  cy.get('[data-test="pony-express"]').should('be.visible');

  // verify Complete Header is correct
  cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');

  // verify Complete Text is correct
  cy.get('[data-test="complete-text"]').should('have.text', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
});


When("I fill out the form incompletely", () => {
  let customerInfo = {
      firstName   : "Jefri",
      lastName    : "Testing",
      postalCode  : ""  // blank value
    }

    // fill in form checkout information
    checkoutPage.checkout(customerInfo);
});


Then("I should see validation message", () => {
    // verify error message is visible
    cy.get('.error-message-container').should('be.visible');
        
    // verify error message is correct
    cy.get('.error-message-container').should('have.text', 'Error: Postal Code is required');
  
});



