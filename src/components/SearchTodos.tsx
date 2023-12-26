import React, { useState } from 'react';
import useTodoStore from '../store';

const TodoSearch = () => {
  const [query, setQuery] = useState('');
  const searchTodos = useTodoStore(state => state.searchTodos);

  const handleSearch = (e) => {
    e.preventDefault();
    searchTodos(query);
  };

  return (
    <form onChange={handleSearch} onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
      />
    </form>
  );
};

export default TodoSearch;
