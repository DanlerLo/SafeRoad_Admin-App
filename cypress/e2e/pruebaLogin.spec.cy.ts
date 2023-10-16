describe('Prueba  Inicio sesión', () => {
  it('Should behave...', () => {
    cy.visit('localhost:4200').wait(1000);
    cy.get('input[formcontrolname="email"]').wait(1000)
      .type('john@example.com').wait(1000)
      .should('have.value', 'john@example.com').wait(1000);
    cy.get('input[formcontrolname="password"]')
      .type('password123').wait(1000)
      .should('have.value', 'password123').wait(1000);
    cy.get('button[ng-reflect-color="primary"]').wait(1000).click();
  });
});
