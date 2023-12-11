import { useState } from "react";
import { MdDelete } from "react-icons/md";

interface Todo {
  id: number;
  text: string;
}

export const FormTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todo, setTodo] = useState("");

  const removeTodo = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const addTodo = () => {
    if (!todo) return;

    const newTodo = {
      id: Math.random() * 1000,
      text: todo,
    };
    setTodo("");
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="flex flex-col">
      <h1>Listagem de Todos</h1>
      <label htmlFor="todo">Todo:</label>
      <input
        type="text"
        name="todo"
        placeholder="Adicione um Todo"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button onClick={() => addTodo()}>Adicionar Todo</button>

      <div className="mt-24">
        <ul>
          {todos.map((todo) => (
            <div key={todo.id} className="flex" data-testId="listTodo">
              <li>{todo.text}</li>
              <button
                aria-label="button to delete todo"
                onClick={() => removeTodo(todo.id)}
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};
