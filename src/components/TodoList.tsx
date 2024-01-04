import React from 'react';
import useTodoStore from '../store';
import TodoItem from './TodoItem';
import './TodoList.css'

const TodoList = () => {
  const { todos, doneTodos } = useTodoStore(state => ({ todos: state.todos, doneTodos: state.doneTodos }));

  return (
    <div className='TodoListContainer'>
      <div className='ActiveTodos'>
        <h2>Active Todos</h2>
        {todos.map(todo => !todo.done && (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>

      <div className='DoneTodos'>
        <h2>Done Todos</h2>
        {doneTodos.map(todo => todo.done && (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
