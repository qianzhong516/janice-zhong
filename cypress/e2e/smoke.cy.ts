const API_DOMAIN = process.env.API_DOMAIN;
const PATH = "visits";
const VISITS_URL = [API_DOMAIN, PATH].join("/");

describe("Smoke test", () => {
  it("loads homepage", () => {
    cy.intercept("GET", VISITS_URL).as("get");
    cy.intercept("PUT", VISITS_URL).as("put");

    cy.visit("/");
    cy.contains("Total Views");

    cy.wait("@get").its("response.statusCode").should("eq", 200);
    cy.wait("@put").its("response.statusCode").should("eq", 200);
  });
});
