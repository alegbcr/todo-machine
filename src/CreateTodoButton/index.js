import React, { useState } from "react";

// css
import "./CreateTodoButton.css";

const CreateTodoButton = ({ addTodo }) => {
  // Local State
  const [newTodoValue, setNewTodoValue] = useState();

  // Functions
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setNewTodoValue("");
  };

  return (
    <>
      <form onSubmit={onSubmit} className="card-container">
        <h1 className="card-title">Craer una nota</h1>
        <textarea
          value={newTodoValue}
          onChange={onChange}
          className="card-input"
          placeholder="Escribe una nota"
        />
        <button className="card-button" type="submit">
          Crear nota
        </button>
      </form>
    </>
  );
};

const CreateTodoButtonOnly = ({ setOpenModal }) => {
  // Functions
  const onClickButton = () => {
    setOpenModal((prevState) => !prevState);
  };

  return (
    <>
      <button className="card__button--only" onClick={onClickButton}>
        Crear nota
      </button>
    </>
  );
};

export { CreateTodoButton, CreateTodoButtonOnly };
