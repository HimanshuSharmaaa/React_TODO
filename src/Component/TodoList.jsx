import React, { useState } from "react";
import { useTodo } from "../Context/TodoContext";
import "./TodoList.css";

const TodoList = ({ todo }) => {
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMsg, setTodoMsg] = useState(todo.todo);

  const editTodo = () => {
    if(todoMsg === '') deleteTodo(todo.id);
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  const LocaltoggleCompleted = () => {
    toggleComplete(todo.id);
  };
 
  return (
    <div className={`TodoListContainer`}>
      <div className={`listItem ${todo.completed ? "bgGrey" : ""} `}>
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={LocaltoggleCompleted}
        />
        <input
          className={`listInputBox ${todo.completed ? "line-through bgGrey" : ""} ${isTodoEditable?'bgGreen border':''}`}
          readOnly={!isTodoEditable}
          type="text"
          value={todoMsg}
          onChange={(e) => setTodoMsg(e.target.value)}
        />
        <button
          id="UpdateBtn"
          onClick={() => {
            if (todo.completed) return;
            if (isTodoEditable) {
              editTodo();
            } else setIsTodoEditable((prev) => !prev);
          }}
          disabled={todo.toggleComplete}
        >
          {!isTodoEditable ? <img
            className="list-Item-Img"
            src="https://cdn-icons-png.flaticon.com/512/420/420140.png"
            alt=""
          /> : <img
          className="list-Item-Img"
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRezLk3xG4Furk19MDQdLH2Kz-mDi8FLrzNBA&s"
          alt=""
        /> }
        </button>
        <button id="deleteBtn" onClick={() => deleteTodo(todo.id)}>
          <img
            className="list-Item-Img"
            src="https://static.vecteezy.com/system/resources/previews/017/350/132/original/red-cancel-icon-design-png.png"
            alt=""
          />
        </button>
      </div>
    </div>
  );
};

export default TodoList;