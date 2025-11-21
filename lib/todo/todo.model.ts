import { useEffect, useMemo, useState } from "react";
import { useDebounce } from "../debounce/debounce";
export interface ITodo {
  id: number;
  title: string;
  completed: boolean;
}

export function useTodo(_todos: ITodo[]) {
  const [todos, setTodos] = useState(_todos);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const done = useMemo(() => todos.filter((todo) => todo.completed), [todos]);
  const debouncedQuery = useDebounce(query, 500);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        setError(error as string);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [debouncedQuery]);

  return {
    todos,
    setTodos,
    loading,
    error,
    query,
    setQuery,
    done,
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
    clear: () => setTodos([]),
    edit: (id: number, title: string) =>
      setTodos(
        todos.map((todo) => (todo.id === id ? { ...todo, title } : todo))
      ),
  };
}
