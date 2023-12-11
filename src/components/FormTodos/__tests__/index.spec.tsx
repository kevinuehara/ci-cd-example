import { render, screen, fireEvent } from "@testing-library/react";
import { FormTodos } from "..";

describe("<FormTodo/>", () => {
  const value = "testing";
  it("should render form todo elements", () => {
    render(<FormTodos />);
    expect(
      screen.getByRole("heading", { name: "Listagem de Todos" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Adicionar Todo" })
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Adicione um Todo")).toBeInTheDocument();
  });

  it("should add a todo", async () => {
    render(<FormTodos />);

    const input = screen.getByPlaceholderText("Adicione um Todo");
    fireEvent.change(input, { target: { value } });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar Todo" }));

    const items = screen.getAllByTestId("listTodo");
    expect(items.length).toBe(1);
    expect(screen.getByText(value)).toBeInTheDocument();
  });

  it("should remove a todo", () => {
    render(<FormTodos />);

    const input = screen.getByPlaceholderText("Adicione um Todo");

    fireEvent.change(input, { target: { value } });
    fireEvent.click(screen.getByRole("button", { name: "Adicionar Todo" }));

    const items = screen.getAllByTestId("listTodo");
    expect(items.length).toBe(1);
    expect(screen.getByText(value)).toBeInTheDocument();

    const deleteBtn = screen.getByLabelText("button to delete todo");
    expect(deleteBtn).toBeInTheDocument();

    fireEvent.click(deleteBtn);
    expect(screen.queryByTestId("listTodo")).toBeNull();
    expect(screen.queryByText(value)).toBeNull();
  });
});
