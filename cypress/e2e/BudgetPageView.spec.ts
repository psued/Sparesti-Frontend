describe('Budget Overview Component', () => {
  beforeEach(() => {
    // Assuming you have set up your server and routes
    cy.visit('/budgetpage'); // Adjust URL based on where the component is rendered
  });

  it('displays the correct heading', () => {
    cy.get('.budget-overview h2').should('contain', 'Månedtlig Budsjett');
  });

  it('displays budget and total budget', () => {
    cy.get('.budget-overview p').should('contain', 'kr av');
  });

  it('displays days left', () => {
    cy.get('.budget-overview span').should('contain', 'Dager Igjen');
  });

  it('redirects on click', () => {
    cy.get('.budget-overview').click();
    cy.url().should('include', '/details');
  });
});
