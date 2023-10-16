describe('Prueba editar Cliente', () => {
    it('Should behave...', () => {
      cy.visit('localhost:4200');
      cy.get('input[formcontrolname="email"]')
        .type('john@example.com')
        .should('have.value', 'john@example.com')
      cy.get('input[formcontrolname="password"]')
        .type('password123')
        .should('have.value', 'password123')
      cy.get('button[ng-reflect-color="primary"]').click();
      cy.get('button[aria-label="Example icon-button with a menu"]:eq(0)').wait(1000).click();
      cy.get('button[tabindex="0"]:eq(1)').wait(1000).click();
      cy.get('input[formcontrolname="name"]').wait(1000)
        .clear()
        .type('Juan')
        .should('have.value', 'Juan');
     cy.contains('Actualizar').click()
    });
  });