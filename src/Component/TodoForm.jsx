import React, { useState } from "react";
import "./TodoForm.css";
import { useTodo } from "../Context/TodoContext";

const TodoForm = () => {
  let [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  const add = (e) => {
    e.preventDefault();
    if (!todo) return;
    addTodo({ id: Date.now(), todo: todo, completed: false });
    setTodo(''); 
  };

  return (
    <div className="inputContainer">
      <input
        type="text"
        className="inputBox"
        value={todo}
        onChange={(e) => {
          setTodo(e.target.value);
        }}
        placeholder="Enter Your todo Here.."
      />
      <button onClick={add} className="inputSubmitBtn">
        Add
      </button>
    </div>
  );
};

export default TodoForm;