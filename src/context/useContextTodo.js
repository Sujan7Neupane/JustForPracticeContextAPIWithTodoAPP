import { createContext, useContext } from "react";

export const TodoContext = createContext({
  todos: {
    id: 1,
    todo: "todo 1",
    completed: false,
  },

  insertTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},

  toggleTodo: (id) => {},
});

export const TodoContextProvider = TodoContext.Provider;

export const useTodo = () => {
  return useContext(TodoContext);
};
