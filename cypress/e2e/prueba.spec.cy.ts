describe('Prueba landing Page', () => {
  it('Should behave...', () => {
    cy.visit('https://m37xft8n-4200.use2.devtunnels.ms/');
    cy.contains('Continue').click();
    cy.get('input[formcontrolname="email"]')
      .type('john@example.com')
      .should('have.value', 'john@example.com');
    cy.get('input[formcontrolname="password"]')
      .type('password123')
      .should('have.value', 'password123');
    cy.get('button[ng-reflect-color="primary"]').click();
  });
});
