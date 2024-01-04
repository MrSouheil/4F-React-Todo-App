import React, { useState } from 'react';
import useTodoStore from '../store';
import './AddTodoForm.css'

const AddTodoForm = () => {
  const addTodo = useTodoStore(state => state.addTodo);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [priority, setPriority] = useState(1);
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(title, content, priority, dueDate);
    setTitle('');
    setContent('');
    setPriority(1);
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className='AddTodoForm'>
      <input
      className='TodoFormTitle'
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />
      <textarea
      className='TodoFormContent'
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
      />
      <select
      className='TodoFormSelect'
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
      >
        {[1, 2, 3, 4, 5].map(p => (
          <option key={p} value={p}>{p}</option>
        ))}
      </select>
      <input
      className='TodoFormDate'
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <button type="submit" className='TodoFormSubmit'>Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
