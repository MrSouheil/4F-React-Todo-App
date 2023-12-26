import React from 'react';
import useTodoStore from '../store';
import './SortingControls.css';

const SortingControls = () => {
  const sortByPriority = useTodoStore(state => state.sortByPriority);
  const sortByDueDate = useTodoStore(state => state.sortByDueDate);

  return (
    <div className='SortButtonsContainer'>
      <button onClick={sortByPriority}>Sort by Priority</button>
      <button onClick={sortByDueDate}>Sort by Due Date</button>
    </div>
  );
};

export default SortingControls;