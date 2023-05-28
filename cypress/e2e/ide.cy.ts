describe('IDE page test', () => {
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
  };

  it('should get to the page IDE', () => {
    login();
    cy.url().should('include', '/ide');
  });

  it('should be value is entered in the field endpoint', () => {
    login();
    cy.get('.graph__intpoint').clear();
    cy.get('.graph__intpoint')
      .type('https://rickandmortyapi.com/graphql')
      .should('have.value', 'https://rickandmortyapi.com/graphql');
  });

  it('should be open / close Request Headers', () => {
    login();
    cy.get('.showTable.close').click();
    cy.get('table').should('have.class', 'requestHeader');
    cy.get('.showTable.open').click();
    cy.get('.requestHeader').should('not.be.empty');
  });

  it('should be dell elements in Request Headers', () => {
    login();
    cy.get('.showTable.close').click();
    cy.get('table tbody tr').should('have.length', 2);
    cy.get('.requestBtnDell').click();
    cy.get('table tbody tr').should('have.length', 1);
  });

  it('should display the result', () => {
    login();
    cy.get('.graph__json pre').should('have.value', '');
    cy.get('.graph__btn-endpoint').click();
    cy.get('.graph__json pre').should('have.class', '__json-pretty__');
  });

  it('end', () => {
    expect(true).to.equal(true);
  });
});
