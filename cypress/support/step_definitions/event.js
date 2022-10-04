import { When } from '@badeball/cypress-cucumber-preprocessor';
import nunjucks from 'nunjucks';

When('I click on {string}', (templateSelector) => {
  const selector = nunjucks.renderString(templateSelector, cy.context);
  cy.get(selector).click();
});
