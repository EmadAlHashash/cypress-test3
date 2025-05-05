describe('Contact Form Validation - Custom HTML Form', () => {

  const url = 'http://127.0.0.1:5500/index.html';

  beforeEach(() => {
    cy.visit(url);
  });

  it('should display all required fields', () => {
    cy.get('input[name="name"]').should('exist');
    cy.wait(3000);
    cy.get('input[name="email"]').should('exist');
    cy.wait(3000);
    cy.get('textarea[name="message"]').should('exist');
  });

  it('should show error for invalid email', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.wait(3000);
    cy.get('input[name="email"]').type('invalidEmail');
    cy.wait(3000);
    cy.get('textarea[name="message"]').type('This is a test message.');
    cy.wait(3000);

    cy.get('form').submit();
    cy.wait(3000);

    cy.get('input[name="email"]:invalid').should('have.length', 1);
  });

  it('should require the message field', () => {
    cy.get('input[name="name"]').type('John Doe');
    cy.wait(3000);
    cy.get('input[name="email"]').type('test@example.com');
    cy.wait(3000);

    cy.get('form').submit();
    cy.wait(3000);

    cy.get('textarea[name="message"]:invalid').should('have.length', 1);
  });

  it('should submit successfully with valid data', () => {
    cy.get('input[name="name"]').clear().type('John Doe');
    cy.wait(3000);
    cy.get('input[name="email"]').clear().type('test@example.com');
    cy.wait(3000);
    cy.get('textarea[name="message"]').clear().type('This is a valid test message.');
    cy.wait(3000);

    cy.get('form').submit();
    cy.wait(3000);

    cy.contains('Thank you for your message!').should('exist');
  });

  it('should prevent duplicate submissions', () => {
    cy.get('input[name="name"]').clear().type('John Doe');
    cy.wait(3000);
    cy.get('input[name="email"]').clear().type('test@example.com');
    cy.wait(3000);
    cy.get('textarea[name="message"]').clear().type('This is a valid test message.');
    cy.wait(3000);

    cy.get('button[type="submit"]').click();
    cy.wait(3000);

    cy.get('button[type="submit"]').should('be.disabled');
    cy.wait(3000);
  });

});
