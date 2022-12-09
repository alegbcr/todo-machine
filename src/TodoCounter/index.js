import React from "react";

// CSS
import "./TodoCounter.css";

const TodoCounter = ({ totalTodos, completedTodos, loading }) => {
  return (
    <div
      className={`TodoCounter__container ${
        !!loading && "TodoCounter__container--loading"
      }`}
    >
      <h1 className="TodoCounter__title">Tus notas</h1>
      <h2 className="TodoCounter__subtitle">
        Haz completado {completedTodos} de {totalTodos} notas
      </h2>
    </div>
  );
};

export default TodoCounter;
