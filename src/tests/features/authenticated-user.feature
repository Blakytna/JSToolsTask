@authenticated
Feature: Authenticated user actions

Scenario: User updates phone number
    Given the user is on the profile page
    When the user updates the phone number
    Then the phone number should be updated in the profile
    And the message "Your profile is successfully updated!" should appear

Scenario: User adds the product to favourites
    Given the authenticated user is on the product page
    When the user clicks the "Add to favourites" button
    Then the product should be added to favourites list