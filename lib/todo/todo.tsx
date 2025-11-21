import { type ITodo, useTodo } from "./todo.model";
import styles from "./todo.module.css";
export function TodoList({ todo }: { todo: ITodo[] }) {
  const todoList = useTodo(todo);
  return (
    <>
      <h2>Todo List</h2>
      <label htmlFor="query">
        Search
        <input
          className="input input-primary"
          id="query"
          type="text"
          value={todoList.query}
          onChange={(e) => todoList.setQuery(e.target.value)}
        />
      </label>
      <div className={`${styles.count}`}>
        Todo Items: {todoList.done.length}/{todoList.todos.length} completed
      </div>
      {todoList.loading && <div>Loading...</div>}
      {todoList.error && <div>{todoList.error}</div>}
      {!todoList.loading && (
        <>
          <div className="flex gap-2">
            <button
              className="btn btn-primary"
              onClick={() => todoList.checkAll()}
            >
              Check All
            </button>
            <button
              className="btn btn-primary"
              onClick={() => todoList.uncheckAll()}
            >
              Uncheck All
            </button>
          </div>
          <ul className={styles.todoList}>
            {todoList.todos.map((todo) => (
              <li className={`${styles.todoItem} pb-2`} id="todo" key={todo.id}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => todoList.toggle(todo.id)}
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
