Feature: Test diagrams page: zoom on all diagrams
  Background:
    Given I clear cache
    And   I set viewport size to '1920' px for width and '1080' px for height
    And   I visit the '/'
    And   I set context field 'projectName' with 'projectTest'
    And   I set context field 'firstModelName' with 'firstModelTest'

    # Project creation
    When I click on '[data-cy="create-project-button"]'
    And  I set on '[data-cy="create-project-form"] [data-cy="name-input"]' text '{{projectName}}'
    And  I click on '[data-cy="create-project-form"] [data-cy="submit-button"]'
    Then I expect current url is '{{ projectName }}/models'

    # First model creation
    When I click on '[data-cy="create-model-button"]'
    Then I expect '[data-cy="create-model-form"] [data-cy="plugin-select"]' is 'terrator-plugin'

    When I set on '[data-cy="create-model-form"] [data-cy="name-input"]' text '{{ firstModelName }}'
    And  I click on '[data-cy="create-model-form"] [data-cy="submit-button"]'
    And  I wait 2 seconds
    Then I expect current url is '{{ projectName }}/modelizer/draw\?path=terrator-plugin/{{ firstModelName }}'
    And  I expect '[data-cy="components-definitions-drawer"]' exists
    And  I expect '[data-cy="component-definitions-item_terrator-plugin"] [data-cy="title"]' is 'terrator-plugin'

    When I click on '[data-cy="component-definitions-item_terrator-plugin"]'
    And  I click on '[data-cy="component-definition_aws"]'
    Then I expect '[data-cy="modelizer-draw-view"] [data-cy="draw-container"]' exists
    And  I expect '[id^="aws"]' exists

    # Back to the diagrams page
    When I visit the 'localhost:8080/#/{{ projectName }}/diagrams'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' exists

  Scenario: Should zoom +.5 on all diagrams
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 276
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 210

    When I click on '[data-cy="zoom-plus-button"]'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 414
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 316

  Scenario: Should zoom -.5 on all diagrams
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 276
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 210

    When I click on '[data-cy="zoom-minus-button"]'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 138
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 105

  Scenario: Should zoom /2 on all diagrams
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 276
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 210

    When I click on '[data-cy="zoom-minus-button"]'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 138
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 105

    When I click on '[data-cy="zoom-minus-button"]'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 69
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 52

  Scenario: Should zoom x2 on all diagrams
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 276
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 210

    When I click on '[data-cy="zoom-minus-button"]'
    And  I click on '[data-cy="zoom-minus-button"]'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 69
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 52

    When I click on '[data-cy="zoom-plus-button"]'
    Then I expect '[data-cy="diagram_{{ firstModelName }}"]' width is 138
    And  I expect '[data-cy="diagram_{{ firstModelName }}"]' height is 105
