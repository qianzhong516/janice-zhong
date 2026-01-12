const API_DOMAIN = process.env.API_DOMAIN;

describe("Smoke test", () => {
  it("loads homepage", () => {
    cy.intercept("GET", API_DOMAIN).as("get");
    cy.intercept("PUT", API_DOMAIN).as("put");

    cy.visit("/");
    cy.contains("Total Views");

    cy.wait("@get").its("response.statusCode").should("eq", 200);
    cy.wait("@put").its("response.statusCode").should("eq", 200);
  });
});
