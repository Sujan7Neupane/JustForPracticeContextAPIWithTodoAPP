import { useEffect, useState } from "react";
import "./App.css";
import { TodoContextProvider } from "./context";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItems";

function App() {
  const [todos, setTodos] = useState([]);

  const insertTodo = (todo) => {
    setTodos((oldTodos) => [{ ...todo, id: Date.now() }, ...oldTodos]);
  };

  const updateTodo = (id, todo) => {
    setTodos((oldTodos) =>
      oldTodos.map((eachTodo) => (eachTodo.id === id ? eachTodo : todo))
    );
  };

  const deleteTodo = (id) => {
    setTodos((oldTodos) => oldTodos.filter((eachTodo) => eachTodo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos((oldTodos) =>
      oldTodos.map((eachTodo) =>
        eachTodo.id === id
          ? { ...eachTodo, completed: !eachTodo.completed }
          : eachTodo
      )
    );
  };

  // Local Storage

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, insertTodo, updateTodo, deleteTodo, toggleTodo }}
    >
      <div className="bg-[#1c712d] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Todo App</h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
