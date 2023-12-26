import React, { useState } from "react";
import AddTodoForm from "./components/AddTodoForm";
import TodoList from "./components/TodoList";
import SortingControls from "./components/SortingControls";
import TodoSearch from "./components/SearchTodos";
import "./App.css";

const App = () => {
  const [isFormVisible, setFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setFormVisible(!isFormVisible);
  };

  return (
    <div className="App">
      <div className="TodoPageTitle">
      <h1>Todo App</h1>
      </div>
      <div className="SearchAddContainer">
        <button onClick={toggleFormVisibility} className="add-button">
          {isFormVisible ? "Close" : "+ Add Todo"}
        </button>
        <div className="SearchContainer">
        <TodoSearch />
        </div>
      </div>
      {isFormVisible && <AddTodoForm />}
      <SortingControls />
      <TodoList />
    </div>
  );
};

export default App;
