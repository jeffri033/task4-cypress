Feature: Shopping in SauceDemo

  Scenario: Add some products to cart
    Given I am logged in as "standard_user" with password "secret_sauce"
    When I add 3 products to the cart
    Then the cart should contain 3 products


  Scenario: Successfull checkout
    Given I am on cart page
    When I click checkout button
    And I enter the checkout information
    And I finish the payment
    Then I should see information of the checkout process is complete


  Scenario: Unsuccessfull checkout
    Given I am on cart page
    When I click checkout button
    And I fill out the form incompletely
    Then I should see validation message

