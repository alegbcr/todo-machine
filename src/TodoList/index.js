import React from "react";
// css
import "./TodoList.css";

const TodoList = (props) => {
  // This const can choose my render type
  const renderFunc = props.render || props.children;

  return (
    <div className="todo-list__main">
      {props.error && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.totalTodos && props.onEmptyTodos()}
      {!!props.totalTodos &&
        !props.searchedTodos.length &&
        props.onEmptySearchResults(props.searchText)}

      {/* {props.searchedTodos.map((todo) => props.render(todo))} -> it's the same as next line but it's more large. */}
      {!props.loading && !props.error && props.searchedTodos.map(renderFunc)}

      <ul className="todo-list__container">{props.children}</ul>
    </div>
  );
};

export { TodoList };
