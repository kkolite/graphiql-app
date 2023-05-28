describe('main page test', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('.header__lang button').contains('button', 'EN').click();
  });

  it('should be language change EN / RU', () => {
    cy.get('.header__lang button').contains('button', 'EN').click();
    cy.get('.project__title').should('contain', 'Project');
    cy.get('.header__lang button').contains('button', 'RU').click();
    cy.get('.project__title').should('contain', 'Проект');
  });

  it('should be header', () => {
    cy.get('header').should('have.class', 'header');
  });

  it('should be name section of Project', () => {
    cy.get('.project__title').should('contain', 'Project');
  });

  it('should be name section of React Course', () => {
    cy.get('.course__title').should('contain', 'React Course');
  });

  it('should be name section of Developers', () => {
    cy.get('.developer__title').should('contain', 'Developers');
  });

  it('clicking the anchor causes the browser to follow the link', () => {
    cy.get('.header__sign a').click();
    cy.url().should('include', '/login');
    cy.url().should('eq', 'http://localhost:5173/login');
  });

  it('should be enter in system', () => {
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
  });

  it('should redirect to 404 page', () => {
    cy.visit('/error');
    cy.get('.remark__error').should('contain', '404 ERROR');
  });

  it('end', () => {
    expect(true).to.equal(true);
  });
});
