describe('Progress Bar Component', () => {
    beforeEach(() => {
      // Visit the page where your ProgressBar component is rendered
      // Update the URL to match your application's URL where the ProgressBar is used
      cy.visit('/details');
    });
  
    it('should display the correct percentage based on value and max', () => {
      const expectedWidth = '30%'; 
      cy.get('.progress-bar .progress').should('have.attr', 'style').and('include', `width: ${expectedWidth}`);
    });
  
    it('should handle zero max by setting width to 0%', () => {
      cy.get('[data-cy="max-input"]').clear().type('0');
      cy.get('[data-cy="value-input"]').clear().type('30');
      cy.get('.progress-bar .progress').should('have.attr', 'style', 'width: 0%;');
    });
  
    it('should not exceed 100% width when value is greater than max', () => {
      // Simulate setting value to 150 and max to 100
      cy.get('[data-cy="value-input"]').clear().type('150');
      cy.get('[data-cy="max-input"]').clear().type('100');
      cy.get('.progress-bar .progress').should('have.attr', 'style', 'width: 100%;');
    });
  
    it('should handle negative values by setting width to 0%', () => {
      // Simulate setting a negative value
      cy.get('[data-cy="value-input"]').clear().type('-10');
      cy.get('[data-cy="max-input"]').clear().type('100');
      cy.get('.progress-bar .progress').should('have.attr', 'style', 'width: 0%;');
    });
  });
  