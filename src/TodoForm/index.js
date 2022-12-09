import React, { useState } from "react";

// css
import "./TodoForm.css";

const TodoForm = ({ addTodo, setOpenModal }) => {
  // Local State
  const [newTodoValue, setNewTodoValue] = useState();

  // Functions
  const onChange = (event) => {
    setNewTodoValue(event.target.value);
  };

  const onCancel = () => {
    setOpenModal(false);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    addTodo(newTodoValue);
    setOpenModal(false);
    setNewTodoValue("");
  };

  return (
    <form onSubmit={onSubmit} className="form__container">
      <label className="form__container--title">Crear una nota</label>
      <textarea
        className="form__container--textarea"
        value={newTodoValue}
        onChange={onChange}
        placeholder="Escribe una nota"
      />
      <div className="form__container--items">
        <button className="cancel" type="button" onClick={onCancel}>
          Cancelar
        </button>
        <button className="add" type="submit">
          Añadir
        </button>
      </div>
    </form>
  );
};

export { TodoForm };
