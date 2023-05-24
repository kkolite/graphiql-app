describe('Modal page test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header__lang button').contains('button', 'EN').click();
  });

  it('should be open Login window', () => {
    cy.get('.header__sign a').click();
    cy.url().should('include', '/login');
  });

  it('should be close Sign in window', () => {
    cy.get('.header__sign a').click();
    cy.url().should('include', '/login');
    cy.get('.modal__close div').click();
    cy.get('[class="modal"]').should((item) => {
      expect(item).to.be.not.empty;
    });
  });

  it('should be open Sign up', () => {
    cy.get('.header__sign a').click();
    cy.get('.modal__account-have').click();
    cy.get('.modal__name').should('contain', 'Sign up');
  });

  it('should be input text in Sign up', () => {
    cy.get('.header__sign a').click();
    cy.get('.modal__account-have').click();
    cy.get('.modal__name').should('contain', 'Sign up');
    cy.get('.modal__text-input input[type="text"]').type('qwe').should('have.value', 'qwe');
    cy.get('.modal__text-input input[type="email"]')
      .type('qwe@qwe.qw')
      .should('have.value', 'qwe@qwe.qw');
    cy.get('.modal__text-input input[type="password"]')
      .type('#123QWEasd')
      .should('have.value', '#123QWEasd');
  });

  it('end', () => {
    expect(true).to.equal(true);
  });
});
