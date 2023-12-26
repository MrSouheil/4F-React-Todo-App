import React, { useState } from "react";
import useTodoStore from "../store"; // Make sure to import your store correctly
import "./EditTodoForm.css";

interface EditTodoFormProps {
  id: string;
  currentTitle: string;
  currentContent: string;
  currentPriority: number;
  currentDueDate: string;
  closeForm: () => void;
}

const EditTodoForm: React.FC<EditTodoFormProps> = ({
  id,
  currentTitle,
  currentContent,
  currentPriority,
  currentDueDate,
  closeForm,
}) => {
  const editTodo = useTodoStore((state) => state.editTodo);
  const [title, setTitle] = useState(currentTitle);
  const [content, setContent] = useState(currentContent);
  const [priority, setPriority] = useState(currentPriority);
  const [dueDate, setDueDate] = useState(currentDueDate);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Perform validation if necessary
    editTodo(id, title, content, priority, dueDate);
    closeForm();
  };

  return (
    <form onSubmit={handleSubmit} className="TodoEditFormContainer">
      <div className="TodoEditContent">
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="TodoEditDetails">
        <label htmlFor="priority">Priority:</label>
        <select
          id="priority"
          value={priority}
          onChange={(e) => setPriority(parseInt(e.target.value, 10))}
        >
          {[1, 2, 3, 4, 5].map((p) => (
            <option key={p} value={p}>{`Priority ${p}`}</option>
          ))}
        </select>

        <label htmlFor="dueDate">Due Date:</label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />
      </div>

      <button type="submit">Update Todo</button>
      <button type="button" onClick={closeForm}>
        Cancel
      </button>
    </form>
  );
};

export default EditTodoForm;