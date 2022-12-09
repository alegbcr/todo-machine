import React, { useState, useEffect } from "react";

// components
import { useTodos } from "./useTodos";
import { TodoHeader } from "../TodoHeader";
import TodoCounter from "../TodoCounter";
import TodoSearch from "../TodoSearch";
import { TodoList } from "../TodoList";
import TodoItem from "../TodoItem";
import { TodosError } from "../TodosError";
import { TodosLoading } from "../TodosLoading";
import { EmptyTodos } from "../EmptyTodos";
import { EmptySearchResults } from "../EmptySearchResults";
import { TodoForm } from "../TodoForm";
import { CreateTodoButton, CreateTodoButtonOnly } from "../CreateTodoButton";
import { Modal } from "../Modal";
import { ChangeAlert } from "../ChangeAlert";

// css
import "./App.css";

const App = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const { states, setStates } = useTodos();

  const {
    loading,
    error,
    totalTodos,
    completedTodos,
    searchValue,
    openModal,
    searchedTodos,
  } = states;

  const {
    setSearchValue,
    addTodo,
    completeTodo,
    deleteTodo,
    setOpenModal,
    sincronizeTodos,
  } = setStates;

  // Viewport Listener
  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [viewportWidth]);

  return (
    <>
      <section
        className={` ${viewportWidth <= 1023 && "mobile__container"} ${
          viewportWidth >= 1024 && "desktop__container"
        }`}
      >
        {viewportWidth <= 1023 && (
          <CreateTodoButtonOnly setOpenModal={setOpenModal} />
        )}
        {viewportWidth >= 1024 && (
          <div className="container__item desktop__card">
            <CreateTodoButton addTodo={addTodo} />
          </div>
        )}

        <div
          className={` ${
            viewportWidth <= 1023 && "mobile__container__item--Item2"
          } ${viewportWidth >= 1024 && "desktop__container__item--Item2"}`}
        >
          <TodoHeader loading={loading}>
            <TodoCounter
              totalTodos={totalTodos}
              completedTodos={completedTodos}
            />
            <TodoSearch
              searchValue={searchValue}
              setSearchValue={setSearchValue}
            />
          </TodoHeader>

          <TodoList
            // Prop value
            error={error}
            loading={loading}
            searchedTodos={searchedTodos}
            totalTodos={totalTodos}
            // Render Prop
            onError={() => <TodosError />}
            onLoading={() => <TodosLoading />}
            onEmptyTodos={() => <EmptyTodos />}
            onEmptySearchResults={() => (
              <EmptySearchResults searchText={searchValue} />
            )}
            // render={(todo) => (
            //   <TodoItem
            //     key={todo.text}
            //     text={todo.text}
            //     completed={todo.completed}
            //     onComplete={() => completeTodo(todo.text)}
            //     onDelete={() => deleteTodo(todo.text)}
            //   />
            // )}
          >
            {(todo) => (
              <TodoItem
                key={todo.text}
                text={todo.text}
                completed={todo.completed}
                onComplete={() => completeTodo(todo.text)}
                onDelete={() => deleteTodo(todo.text)}
              />
            )}
          </TodoList>

          {/* Falta de trabajar */}
          {/* <div className="item2__item">
                    <button>
                      <i className="far fa-eye-slash"> Hide completed task</i>
                    </button>
                  </div> */}

          {!!openModal && (
            <Modal>
              <TodoForm addTodo={addTodo} setOpenModal={setOpenModal} />
            </Modal>
          )}
          <ChangeAlert sincronize={sincronizeTodos} />
        </div>
      </section>
    </>
  );
};

export default App;
