/// <reference types="cypress" />

describe('Nav_View', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should display the logo', () => {
      cy.get('.logo').should('be.visible');
    });
  
    it('should toggle the sidebar when hamburger menu is clicked', () => {
      cy.get('.hamburger-box').click();
      cy.get('.sidebar').should('be.visible');
  
      cy.get('.hamburger-box').click();
      cy.get('.sidebar').should('not.be.visible');
    });
  
    it('should navigate to home page when phone bar home icon is clicked', () => {
        cy.viewport(479, 800); // Set viewport width to less than 480px
        cy.get('.phone-bar-item').eq(0).click();
        cy.url().should('include', '/');

        // Add more test cases for other phone bar icons
    });
  
    it('should have a top bar with a logo', () => {
      cy.get('.top-bar').should('exist');
      cy.get('.logo').should('exist');
    });
  
    it('should have a hamburger menu', () => {
      cy.get('.hamburger').should('exist');
      cy.get('.hamburger-box').should('exist');
      cy.get('.hamburger-line').should('have.length', 3);
    });
  
    it('should have a sidebar', () => {
      cy.get('.hamburger-box').click();
      cy.get('.sidebar').should('exist');
    });
  
    it('should have a phone bar', () => {
        cy.viewport(479, 800); // Set viewport width to less than 480px
      cy.get('.phone-bar').should('exist');
      cy.get('.phone-bar-item').should('have.length', 3);
    });
  });