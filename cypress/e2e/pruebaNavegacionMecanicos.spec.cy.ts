describe('Prueba Navegación Mecanicos', () => {
    it('Should behave...', () => {
      cy.visit('localhost:4200');
      cy.get('input[formcontrolname="email"]')
        .type('john@example.com')
        .should('have.value', 'john@example.com')
      cy.get('input[formcontrolname="password"]')
        .type('password123')
        .should('have.value', 'password123')
      cy.get('button[ng-reflect-color="primary"]').click();
      cy.contains('Mecanicos').wait(1000).click();
      cy.get('button[aria-label="Next page"]').wait(2000).click();
    });
  });