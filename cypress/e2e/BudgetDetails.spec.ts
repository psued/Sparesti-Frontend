describe('Budget Details Page', () => {
    beforeEach(() => {
      // Assuming your Vue app is served from the root
      cy.visit('/details');
    });
  
    it('should navigate back when clicking on the back arrow', () => {
      cy.get('.back-arrow').click();
      cy.url().should('not.include', '/budgetpage');  // adjust as necessary based on your routing
    });
  
    it('displays the correct remaining budget and total budget', () => {
      cy.get('.budget-details h2').should('contain', 'Resterende budsjett');
      cy.get('.budget-details p').should('contain', '6969 kr av 10000 kr');
    });
  
    it('lists all expenses with correct details', () => {
      const categories = ['Kvitteringer', 'Mat', 'Klær', 'Fritid', 'Betting'];
      cy.get('.expenses ul li').should('have.length', categories.length);
  
      categories.forEach((category, index) => {
        cy.get('.expenses ul li').eq(index).within(() => {
          cy.get('.category').should('contain', category);
          cy.get('.emoji').should('exist'); // checks if emoji is rendered
          cy.get('.amount').invoke('text').should('match', /kr igjen av/); // regex to ensure format is correct
        });
      });
    });
  
  });
  