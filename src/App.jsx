import { useEffect, useState } from "react";
import TodoForm from "./Component/TodoForm";
import TodoList from "./Component/TodoList";
import { TodoContextProvider } from "./Context";
import "./App.css";

function App() {
  let [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (todo, id) => {
    setTodos((prev) => prev.map((prevIndividualTodo) => prevIndividualTodo.id === id ? todo : prevIndividualTodo));
  };

  const deleteTodo = (id) => { setTodos((prev) => prev.filter((prevIndividualTodo) => prevIndividualTodo.id !== id))};

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevIndividualTodo) =>
        prevIndividualTodo.id === id
          ? {
              ...prevIndividualTodo,
              completed: !prevIndividualTodo.completed,
            }
          : prevIndividualTodo
      )
    );
  };

  useEffect(() => {
    try {
      const todos = JSON.parse(localStorage.getItem("todos"));

      if (Array.isArray(todos) && todos.length > 0) {
        setTodos(todos);
      }
    } catch (error) {
      console.error("Error parsing todos from localStorage:", error);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="AppContainer">
        <h1>MANAGE YOUR'S TODO LIST</h1>
        <TodoForm />
        {todos.map((todo) => (
          <div key={todo.id}>
            <TodoList todo={todo} />
          </div>
        ))}
      </div>
    </TodoContextProvider>
  );
}

export default App;