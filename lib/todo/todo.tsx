import { type ITodo, useTodo } from "./todo.model";

export function TodoList({ todo }: { todo: ITodo[] }) {
  const todoList = useTodo(todo);

  return (
    <>
      <h1>Todo List</h1>
      <input
        type="text"
        value={todoList.query}
        onChange={(e) => todoList.setQuery(e.target.value)}
      />
      {todoList.loading && <div>Loading...</div>}
      {todoList.error && <div>{todoList.error}</div>}
      <div>{todoList.todos.length}</div>
      {!todoList.loading && (
        <>
          <div className="flex gap-2">
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
      )}
    </>
  );
}
