Feature: Test modelizer text view: common action of git branch menu

  Background:
    Given I clear cache
    And I visit the "/"

    When I click on '[data-cy="new-project"]'
    And  I set on '[data-cy="new-project-form"] [data-cy="name-input"]' text "projectName"
    And  I click on '[data-cy="new-project-form"] [data-cy="submit-button"]'
    Then I expect current url is "/modelizer/projectName/model"

    When I visit the "/#/modelizer/projectName/text"

  Scenario: Should check the text of expand branches button
    When I click on '[data-cy="git-current-branch-button"]'
    And  I wait 2 seconds
    # Create new branch test 1
    And  I click on '[data-cy="git-menu-new-branch"]'
    And  I expect '[data-cy="git-new-branch-form"]' exists
    And  I set on '[data-cy="git-new-branch-form"] [data-cy="branch-name-input"]' text "test1"
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="checkout-checkbox"]'
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="submit-button"]'
    And  I expect '[data-cy="git-new-branch-form"]' is closed
    # Create new branch test 2
    When I click on '[data-cy="git-current-branch-button"]'
    And  I click on '[data-cy="git-menu-new-branch"]'
    And  I expect '[data-cy="git-new-branch-form"]' exists
    And  I set on '[data-cy="git-new-branch-form"] [data-cy="branch-name-input"]' text "test2"
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="checkout-checkbox"]'
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="submit-button"]'
    And  I expect '[data-cy="git-new-branch-form"]' is closed
    # Create new branch test 3
    When I click on '[data-cy="git-current-branch-button"]'
    And  I click on '[data-cy="git-menu-new-branch"]'
    And  I expect '[data-cy="git-new-branch-form"]' exists
    And  I set on '[data-cy="git-new-branch-form"] [data-cy="branch-name-input"]' text "test3"
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="checkout-checkbox"]'
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="submit-button"]'
    And  I expect '[data-cy="git-new-branch-form"]' is closed
    # Create new branch test 4
    When I click on '[data-cy="git-current-branch-button"]'
    And  I click on '[data-cy="git-menu-new-branch"]'
    And  I expect '[data-cy="git-new-branch-form"]' exists
    And  I set on '[data-cy="git-new-branch-form"] [data-cy="branch-name-input"]' text "test4"
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="checkout-checkbox"]'
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="submit-button"]'
    And  I expect '[data-cy="git-new-branch-form"]' is closed
    # Create new branch test 5
    When I click on '[data-cy="git-current-branch-button"]'
    And  I click on '[data-cy="git-menu-new-branch"]'
    And  I expect '[data-cy="git-new-branch-form"]' exists
    And  I set on '[data-cy="git-new-branch-form"] [data-cy="branch-name-input"]' text "test5"
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="checkout-checkbox"]'
    And  I click on '[data-cy="git-new-branch-form"] [data-cy="submit-button"]'
    And  I expect '[data-cy="git-new-branch-form"]' is closed

    When I click on '[data-cy="git-current-branch-button"]'
    And  I wait 2 seconds
    And  I scroll to "bottom" into '[data-cy="git-branch-menu"]'
    Then I expect '[data-cy="git-branch-expand-menu-text"]' is "Show 1 more..."

    When I click on '[data-cy="git-branch-expand-local-menu"]'
    Then I expect '[data-cy="git-branch-expand-local-menu"] [data-cy="git-branch-expand-menu-text"]' is "Show less"

    When I click on '[data-cy="project-settings"]'
    And  I click on '[data-cy="git-current-branch-button"]'
    Then I expect '[data-cy="git-branch-expand-local-menu"] [data-cy="git-branch-expand-menu-text"]' is "Show 1 more..."
