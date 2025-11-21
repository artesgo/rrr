import { act, renderHook } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useTodo } from "./todo.model";

describe("useTodo", () => {
  test("should initialize todo hook", async () => {
    const { result } = renderHook(() => useTodo([]));
    expect(result.current.todos.length).toEqual(0);
  });

  test("should accept todos through setTodos", () => {
    const { result } = renderHook(() => useTodo([]));
    act(() =>
      result.current.setTodos([{ id: 1, title: "test", completed: false }])
    );
    expect(result.current.todos.length).toEqual(1);
  });

  test("should check the selected todo", () => {
    const { result } = renderHook(() =>
      useTodo([
        { id: 1, title: "test", completed: false },
        { id: 2, title: "test", completed: false },
      ])
    );
    act(() => {
      result.current.toggle(1);
    });
    expect(result.current.todos.length).toEqual(2);
    expect(result.current.done.length).toEqual(1);
    expect(result.current.todos[0].completed).toEqual(true);
    act(() => {
      result.current.setTodos([]);
    });
    expect(result.current.todos.length).toEqual(0);
    expect(result.current.done.length).toEqual(0);
  });

  test("should check and uncheck the whole list", () => {
    const { result } = renderHook(() =>
      useTodo([
        { id: 1, title: "test", completed: false },
        { id: 2, title: "test", completed: false },
      ])
    );
    act(() => {
      result.current.checkAll();
    });
    expect(result.current.todos.length).toEqual(2);
    expect(result.current.done.length).toEqual(2);

    act(() => {
      result.current.uncheckAll();
    });
    expect(result.current.todos.length).toEqual(2);
    expect(result.current.done.length).toEqual(0);
  });

  test("should clear the todo list", () => {
    const { result } = renderHook(() =>
      useTodo([
        { id: 1, title: "test", completed: false },
        { id: 2, title: "test", completed: false },
      ])
    );
    act(() => {
      result.current.clear();
    });
    expect(result.current.todos.length).toEqual(0);
    expect(result.current.done.length).toEqual(0);
  });

  test("should edit the todo title", () => {
    const { result } = renderHook(() =>
      useTodo([
        { id: 1, title: "test", completed: false },
        { id: 2, title: "test", completed: false },
      ])
    );
    act(() => {
      result.current.edit(1, "new title");
    });
    expect(result.current.todos.length).toEqual(2);
    expect(result.current.todos[0].title).toEqual("new title");
  });
});
