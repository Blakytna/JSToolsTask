@public
Feature: Public user actions

  Scenario: User adds the product to the cart
    Given the user is on the product page
    When the user clicks the "Add to cart" button
    Then the product should be added to the cart
    And the message "Product added to shopping cart." should appear
    And the cart badge should display "1" item

  Scenario: User changes quantity in the cart
    Given the user has added a product to the cart
    And the user is on the cart page
    When the user updates the quantity of the item to "2"
    Then the total price should be recalculated
    And the message "Product quantity updated." should appear

  Scenario: User opens product category
    Given the user is on the home page
    When the user clicks "Categories" button
    And the user selects the "Hand Tools" product category
    Then the category page title should be "Category: Hand Tools"

  Scenario: User changes the language
    Given the user is on the home page
    When the user clicks on the language menu
    And the user selects the "German" language
    Then the sign-in button text should change to "Einloggen"