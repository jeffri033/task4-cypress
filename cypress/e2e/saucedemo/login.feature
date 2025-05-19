Feature: Login to SauceDemo

  Scenario: Successful login with valid credentials
    Given I open the SauceDemo login page
    When I enter the username "standard_user" and password "secret_sauce"
    And I click the login button
    Then I should be redirected to the product page


  Scenario: Unsuccessful login with invalid credentials
    Given I open the SauceDemo login page
    When I enter the username "invalid_user" and password "invalid_password"
    And I click the login button
    Then I should see an error message