import { useState } from "react";

export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodo(_todos: ITodo[]) {
  const [todos, setTodos] = useState(_todos);
  return {
    todos,
    checkAll: () =>
      setTodos(todos.map((todo) => ({ ...todo, completed: true }))),
    uncheckAll: () =>
      setTodos(todos.map((todo) => ({ ...todo, completed: false }))),
    toggle: (id: number) =>
      setTodos(
        todos.map((todo) =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        )
      ),
    edit: (id: number, title: string) =>
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      ),
  };
}
