Feature: Test roundtrip of the application : create project files

  Background:
    Given I clear cache
    And   I set viewport size to '1920' px for width and '1080' px for height
    And   I set context field 'projectName' with 'projectTest'
    And   I set context field 'modelName' with 'modelTest'
    And   I visit the '/'

  Scenario: Create project redirect to models page with correct plugin and create project files and folders
    # Create new project
    When I click on '[data-cy="create-project-button"]'
    And  I set on '[data-cy="create-project-form"] [data-cy="name-input"]' text '{{projectName}}'
    And  I click on '[data-cy="create-project-form"] [data-cy="submit-button"]'
    Then I expect 'positive' toast to appear with text 'Project has been created 🥳!'
    And  I expect current url is 'modelizer/{{projectName}}/models'

    # Create new model with correct plugin
    When I click on '[data-cy="create-model-button"]'
    Then I expect '[data-cy="create-model-form"] [data-cy="plugin-select"]' is 'terrator-plugin'

    When I set on '[data-cy="create-model-form"] [data-cy="name-input"]' text '{{modelName}}'
    And  I click on '[data-cy="create-model-form"] [data-cy="submit-button"]'
    Then I expect 'positive' toast to appear with text 'Model has been created 🥳!'
    And  I expect current url is 'modelizer/{{projectName}}/model\?path=terrator-plugin/{{modelName}}'

    # Check project files and folders are created in Text view
    When I click on '[data-cy="modelizer-switch-button"] [aria-pressed="false"]'
    Then I expect current url is 'modelizer/{{projectName}}/text\?path=terrator-plugin/{{modelName}}'
    And  I expect '[data-cy="file-explorer"] [data-cy="folder_{{projectName}}"]' is '{{projectName}}'

    When I click on '[data-cy="file-explorer"] [data-cy="folder_{{projectName}}"]'
    Then I expect '[data-cy="file-explorer"] [data-cy="folder_terrator-plugin"]' exists

    When I click on '[data-cy="file-explorer"] [data-cy="folder_terrator-plugin"]'
    Then I expect '[data-cy="file-explorer"] [data-cy="folder_terrator-plugin/{{modelName}}"]' exists
    And  I expect '[data-cy="file-explorer"] [data-cy="file_terrator-plugin/{{modelName}}/leto-modelizer.config.json"]' exists

    # Check project is displayed in home page
    When I visit the '/'
    Then I expect '[data-cy="project-card_{{projectName}}"]' appear 1 time on screen
    And  I expect '[data-cy="project-card_{{projectName}}"] [data-cy="title-container"]' is '{{projectName}}'
