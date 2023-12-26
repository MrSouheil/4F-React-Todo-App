import React from 'react';
import useTodoStore from '../store';
import TodoItem from './TodoItem';
import './TodoList.css'

const TodoList = () => {
  const todos = useTodoStore(state => state.todos);

  return (
    <div className='TodoListContainer'>
      {todos.map(todo => (
        <TodoItem key={todo.id} {...todo} />
      ))}
    </div>
  );
};

export default TodoList;
