// cypress/page_objects/product-page.js

class ProductPage {
  seeProduct(product) {
      // scroll to view the product using the correct selector
      cy.get('.inventory_item_name').contains(product.name)
                                    .as('item')
                                    .scrollIntoView({ duration: 3000 });


      // verify product name is displayed
      cy.get('@item').should('be.visible');


      // verify description is correct
      cy.get('@item').parent()
                     .next()
                     .should('have.text', product.desc);


      // verify price is correct
      cy.get('@item').closest('.inventory_item_label')
                     .next()
                     .find('.inventory_item_price')
                     .should('have.text', '$' + product.price);


      // verify button 'Add to cart' is displayed
      cy.get('@item').closest('.inventory_item_label')
                     .next()
                     .find('button', 'Add to cart').should('be.visible');


      // verify product image is displayed
      cy.get('img[alt="' + product.name + '"]').should('be.visible');


      // click to see product detail
      cy.get('@item').click();
  }



  seeProductDetail(product) {
      // verify product name is displayed
      cy.get('.inventory_details_name').contains(product.name)
                                       .as('item-detail')
                                       .should('be.visible');

      // verify description is correct
      cy.get('@item-detail').siblings('.inventory_details_desc')
                            .should('have.text', product.desc);

                            
      // verify price is correct
      cy.get('@item-detail').siblings('.inventory_details_price')
                            .should('have.text', '$' + product.price);


      // verify button 'Add To Chart' is displayed
      cy.get('@item-detail').siblings()
                            .last()
                            .should('be.visible');
  }



  addProductToCart(product, index) {
      // click button 'Add To Chart'
      cy.get('@item-detail').siblings()
                            .last()
                            .as('button-add-to-cart')
                            .click();


      // verify button 'Add To Chart' should change to button 'Remove'
      cy.get('@button-add-to-cart').should('have.text', 'Remove')


      // scroll to view shopping cart
      cy.get('.shopping_cart_link').scrollIntoView({
          duration: 3000
      });


      // verify quantity of item in shopping cart
      cy.get('[data-test="shopping-cart-badge"]').should('have.text', index + 1);


      // click button 'Back To Product'
      cy.get('#back-to-products').click();


      // scroll to view product
      cy.get('@item').scrollIntoView({
          duration: 3000
      });


      // verify button 'Remove' is displayed
      cy.get('@item').closest('.inventory_item_label')
                      .next()
                      .find('button', 'Remove').should('be.visible');
  }

}

export default ProductPage;