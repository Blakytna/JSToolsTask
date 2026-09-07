@authentication
Feature: User authentication

  Scenario: User registers a new account and logs in successfully
    Given the user is on the home page
    When the user registers a new account
    And the user logs in with the created credentials
    Then the user should be redirected to the account page
