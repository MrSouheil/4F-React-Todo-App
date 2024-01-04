import React, { useState } from "react";
import useTodoStore from "../store";
import EditTodoForm from "./EditTodoForm";
import { isDueInNext24Hours } from "./utils";
import "./TodoItem.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";

const TodoItem = ({ id, title, content, priority, dueDate, done }) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleDone = useTodoStore((state) => state.toggleDone);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);

  const toggleEdit = () => setIsEditing(!isEditing);

  const handleDelete = () => {
    deleteTodo(id);
  };

  const handleToggle = () => {
    toggleDone(id);
  };

  const itemClass = `todo-item ${done ? "done" : ""} ${
    isDueInNext24Hours(dueDate) ? "urgent" : ""
  }`;

  return (
    <div className="TodoItemContainer">
      <div className={`${itemClass}`}>
        <input type="checkbox" checked={done} onChange={handleToggle} />
        <div className="TodoItemContentContainer">
          <h3>{title}</h3>
          <p>{content}</p>
          <span>Priority: {priority}</span>
          <hr />
          <span>Due: {dueDate}</span>
        </div>
        <div className="TodoItemButtonContainer">
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="xl"
            onClick={toggleEdit}
            style={{ cursor: "pointer" }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            size="xl"
            onClick={handleDelete}
            style={{ cursor: "pointer" }}
          />
        </div>
      </div>
      {isEditing && (
        <EditTodoForm
          id={id}
          currentTitle={title}
          currentContent={content}
          currentPriority={priority}
          currentDueDate={dueDate}
          closeForm={toggleEdit}
        />
      )}
    </div>
  );
};

export default TodoItem;
