import React from "react";

// CSS
import "./TodoSearch.css";

const TodoSearch = ({ searchValue, setSearchValue, loading }) => {
  // Functions
  const onSearchValueChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div
      className={`todo-search__container ${
        !!loading && "todo-search__container--loading"
      }`}
    >
      <div className="todo-search--item">
        <input
          className="todo-search"
          placeholder="Buscar"
          value={searchValue}
          onChange={onSearchValueChange}
          disabled={loading}
        />
        <i className="fas fa-search"></i>
      </div>
    </div>
  );
};

export default TodoSearch;
