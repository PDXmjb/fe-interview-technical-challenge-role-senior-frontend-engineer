/// <reference types="cypress" />

describe('happy path', () => {
  it('runs happy path successfully', () => {
    cy.visit('/');
    cy.getTestEl('table_link').should('be.visible');
    cy.getTestEl('you_go_link').should('be.visible');
    cy.getTestEl('policyholders_link').should('be.visible');

    cy.get('a').contains('Policyholders').click();
    cy.intercept({
      method: 'GET',
      url: 'https://fe-interview-technical-challenge-api-git-main-sure.vercel.app/api/policyholders',
    }).as('dataLoaded');

    cy.wait('@dataLoaded').then((interception) => {
      assert.isNotNull(interception.response.body);
      cy.contains('Policyholder:').should('be.visible');
      cy.contains('1-989-989-9898').should('be.visible');
    });

    cy.get('button').contains('Add a new policy').click();
    cy.contains('1-555-203-2111').should('be.visible');
  });
});
