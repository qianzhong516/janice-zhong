describe("Smoke test", () => {
  it("loads homepage", () => {
    cy.visit("/");
    cy.contains("Total Views");
  });
});
