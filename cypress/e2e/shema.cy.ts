describe('Shema test', () => {
  const login = () => {
    cy.visit('/');
    cy.get('.header__sign a').click();
    cy.url().should('include', '/login');
    cy.get('.modal__text-input input[type="email"]')
      .type('qwe@qwe.qw')
      .should('have.value', 'qwe@qwe.qw');
    cy.get('.modal__text-input input[type="password"]')
      .type('#123QWEasd')
      .should('have.value', '#123QWEasd');
    cy.get('.modal__btn').click();
    cy.url().should('eq', 'http://localhost:5173/ide');
    cy.visit('/ide');
    cy.get('.header__lang button').contains('button', 'EN').click();
  };

  it('should get Show Docs', () => {
    login();
    cy.get('.graph__show div').should('contain', 'Show Docs');
  });

  it('should be no schema', () => {
    login();
    cy.get('.graph__show').click();
    cy.get('[class*="_container_"] p').should('have.text', 'No Schema 🤷');
  });

  it('should be docs schema', () => {
    login();
    cy.get('.graph__btn-endpoint').click();
    cy.get('.graph__json pre').should('have.class', '__json-pretty__');
    cy.get('.graph__show').click();
    cy.get('[class*="_container_"]').should((item) => {
      expect(item).to.be.not.empty;
    });
  });

  it('end', () => {
    expect(true).to.equal(true);
  });
});
