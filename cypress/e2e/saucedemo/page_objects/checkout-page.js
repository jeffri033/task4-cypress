// cypress/page_objects/checkout-page.js

class CheckoutPage {
    constructor() {
        this.subtotal = 0;
        this.tax = 0;
        this.grandtotal = 0;
    }

    seeCartPage(products) {
        // loop through all the products in the fixture
        products.forEach((product) => {

            // verify product name is correct
            cy.get('[data-test="inventory-item-name"]').contains(product.name)
                                                       .as('item')
                                                       .should('be.visible');

            // verify quantity is correct
            cy.get('@item').closest('.cart_item_label')
                           .prev()
                           .should('have.text', '1');

            // verify description is correct
            cy.get('@item').parent()
                           .siblings('.inventory_item_desc')
                           .should('have.text', product.desc);

            // verify price is correct
            cy.get('@item').parent()
                           .siblings('.item_pricebar')
                           .find('.inventory_item_price')
                           .should('have.text', '$' + product.price);

            // verify button 'Remove' is displayed
            cy.get('@item').parent()
                           .siblings()
                           .last()
                           .find('button', 'Remove')
                           .should('be.visible');
            
        })
    
    }


    checkout(customerInfo) {
        // type First Name
        cy.get('#first-name').type(customerInfo.firstName);

        // type Last Name
        cy.get('#last-name').type(customerInfo.lastName);


        if (customerInfo.postalCode !== '') {
            // type Postal Code
            cy.get('#postal-code').type(customerInfo.postalCode);    
        }


        // click button Continue
        cy.get('#continue').click();
    }


    payment(products) {
        // loop through all the products in the fixture
        products.forEach((product) => {
            this.subtotal = this.subtotal + product.price;            
        })


        // calculate tax
        this.tax = this.subtotal * 0.08;

        // round up to 2 decimals
        this.tax = Math.ceil(this.tax * 100) / 100;

        // calculate grandtotal
        this.grandtotal = this.subtotal + this.tax;


        // verify Payment Info
        cy.get('[data-test="payment-info-value"]').should('have.text', 'SauceCard #31337');

        // verify Shipping Info
        cy.get('[data-test="shipping-info-value"]').should('have.text', 'Free Pony Express Delivery!');

        // verify Sub Total
        cy.get('[data-test="subtotal-label"]').should('have.text', 'Item total: $' + this.subtotal);

        // verify Tax
        cy.get('[data-test="tax-label"]').should('have.text', 'Tax: $' + this.tax);

        // verify Grand Total
        cy.get('[data-test="total-label"]').should('have.text', 'Total: $' + this.grandtotal);


        // scroll to button Finish
        cy.get('#finish').scrollIntoView({
            duration: 3000
        });


        // click button Finish
        cy.get('#finish').click();
    }


}


export default CheckoutPage;