describe('Prueba Navegaión App', () => {
    it('Should behave...', () => {
      cy.visit('localhost:4200');
      cy.get('input[formcontrolname="email"]')
        .type('john@example.com')
        .should('have.value', 'john@example.com')
      cy.get('input[formcontrolname="password"]')
        .type('password123')
        .should('have.value', 'password123')
      cy.get('button[ng-reflect-color="primary"]').click().wait(2000);
      cy.contains('Salir').wait(2000).click();
    });
  });