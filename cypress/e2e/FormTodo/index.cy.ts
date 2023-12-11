/// <reference types="cypress" />

describe("<FormTodo />", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("should do the add Todo", () => {
    const newItem = "Fazer testes";
    cy.contains("Listagem de Todos").should("exist");
    cy.get("input[type=text]").type(`${newItem}`);
    cy.get("button").click();
    cy.get("li").should("have.length", 1).first().should("have.text", newItem);
  });

  it("should do the remove Todo", () => {
    const newItem = "Fazer testes";
    cy.contains("Listagem de Todos").should("exist");
    cy.get("input[type=text]").type(`${newItem}`);
    cy.get("button").click();
    cy.get(`[aria-label="button to delete todo"]`).click();
    cy.get("li").should("have.length", 0);
  });
});
