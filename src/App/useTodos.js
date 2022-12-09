import { useState } from "react";

import { useLocalStorage } from "./useLocalStorage";

const useTodos = () => {
  // get custom hook useLocalStorage
  const {
    item: todos,
    saveItem: saveTodos,
    sincronizeItem: sincronizeTodos,
    loading,
    error,
  } = useLocalStorage("TODOS_V1", []);

  // States
  const [searchValue, setSearchValue] = useState("");
  // modal state
  const [openModal, setOpenModal] = useState(false);

  /* FUNCTIONS */
  const completedTodos = todos.filter((todo) => !!todo.completed).length;
  const totalTodos = todos.length;

  // Data Filter
  let searchedTodos = [];
  if (!searchValue.length >= 1) {
    searchedTodos = todos;
  } else {
    searchedTodos = todos.filter((todo) => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    });
  }

  // Add ToDo
  const addTodo = (text) => {
    const newTodos = [...todos];
    newTodos.push({
      completed: false,
      text,
    });
    saveTodos(newTodos);
  };

  // Complete ToDo
  const completeTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = true;
    saveTodos(newTodos);
  };

  // Delete ToDos
  const deleteTodo = (text) => {
    const todoIndex = todos.findIndex((todo) => todo.text === text);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  };

  // Hide ToDos
  // if (todos.completed === false) {
  // }

  const states = {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    openModal,
    searchedTodos,
  };

  const setStates = {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
  };
  return { states, setStates };
};

export { useTodos };
