import React from "react";

// css
import "./TodoItem.css";

const TodoItem = (props) => {
  return (
    <li
      className={`todo-item__container ${
        props.completed && "todo-item__container--completed"
      }`}
    >
      <i
        className={`fas fa-check check complete ${
          props.completed && "check--completed"
        }`}
        onClick={props.onComplete}
      ></i>
      <p className={`${props.completed && "task__item--completed"}`}>
        {props.text}
      </p>
      <i className="far fa-times-circle close" onClick={props.onDelete}></i>
    </li>
  );
};

export default TodoItem;
