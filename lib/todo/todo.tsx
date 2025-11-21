import { useId } from "react";
import { type ITodo, useTodo } from "./todo.model";
import styles from "./todo.module.css";
export function TodoList({ todo }: { todo: ITodo[] }) {
  const todoList = useTodo(todo);
  const checkAllId = useId();
  const uncheckAllId = useId();
  return (
    <>
      <h2>Todo List</h2>
      <label htmlFor="query">
        <span className="mr-2">Search</span>
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
              id={checkAllId}
              className="btn btn-primary"
              onClick={() => todoList.checkAll()}
            >
              Check All
            </button>
            <button
              id={uncheckAllId}
              className="btn btn-primary"
              onClick={() => todoList.uncheckAll()}
            >
              Uncheck All
            </button>
          </div>
          <ul className={styles.todoList}>
            {todoList.todos.map((todo) => (
              <li key={todo.id} className="mb-2">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    id={"checkbox-" + todo.id}
                    className="checkbox checkbox-primary mr-2"
                    checked={todo.completed}
                    onChange={() => todoList.toggle(todo.id)}
                  />
                  <input
                    type="text"
                    id={"input-" + todo.id}
                    className="input input-primary w-full"
                    value={todo.title}
                    onChange={(e) => todoList.edit(todo.id, e.target.value)}
                  />
                </label>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  );
}
