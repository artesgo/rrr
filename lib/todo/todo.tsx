import { type ITodo, useTodo } from "./todo.model";

export function TodoList({ todo }: { todo: ITodo[] }) {
  const todoList = useTodo(todo);
  return (
    <>
      <h1>Todo List</h1>
      <div>{todoList.todos.length}</div>
      <div>
        <button onClick={() => todoList.checkAll()}>Check All</button>
        <button onClick={() => todoList.uncheckAll()}>Uncheck All</button>
      </div>
      <ul>
        {todoList.todos.map((todo) => (
          <li key={todo.id}>
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => todoList.toggle(todo.id)}
              />
              {todo.title}
            </label>
          </li>
        ))}
      </ul>
    </>
  );
}
