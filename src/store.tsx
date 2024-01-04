import create from "zustand";
import { v4 as uuidv4 } from "uuid";
import { loadFromLocalStorage, saveToLocalStorage } from "./components/utils";

interface Todo {
  id: string;
  title: string;
  content: string;
  priority: number;
  done: boolean;
  dueDate: string;
}

interface TodoState {
  initialTodos: Todo[];
  todos: Todo[];
  addTodo: (
    title: string,
    content: string,
    priority: number,
    dueDate: string
  ) => void;
  toggleDone: (id: string) => void;
  editTodo: (
    id: string,
    title: string,
    content: string,
    priority: number,
    dueDate: string
  ) => void;
  deleteTodo: (id: string) => void;
  sortByPriority: () => void;
  sortByDueDate: () => void;
  searchTodos: (query: string) => void;
  // ... other actions
}

const useTodoStore = create<TodoState>((set) => {
  const initialState = loadFromLocalStorage("todos") || [];

  return {
    initialTodos: [],
    todos: initialState,
    addTodo: (title, content, priority, dueDate) => {
      set((state) => {
        const newTodo = {
          id: uuidv4(),
          title,
          content,
          priority,
          done: false,
          dueDate,
        };
        const newTodos = [...state.todos, newTodo];
        saveToLocalStorage("todos", newTodos);
        return { todos: newTodos };
      });
    },
    toggleDone: (id) =>
      set((state) => ({
        todos: state.todos.map((todo) =>
          todo.id === id ? { ...todo, done: !todo.done } : todo
        ),
      })),
    editTodo: (id, title, content, priority, dueDate) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, title, content, priority, dueDate } : todo
        );
        saveToLocalStorage("todos", updatedTodos); // Save updated todos to local storage
        return { todos: updatedTodos };
      });
    },
    deleteTodo: (id) => {
      set((state) => {
        const newTodos = state.todos.filter((todo) => todo.id !== id);
        saveToLocalStorage("todos", newTodos);
        return { todos: newTodos };
      });
    },
    sortByPriority: () =>
      set((state) => ({
        todos: [...state.todos].sort((a, b) => a.priority - b.priority),
      })),
    sortByDueDate: () =>
      set((state) => ({
        todos: [...state.todos].sort(
          (a, b) =>
            new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
        ),
      })),
    searchTodos: (query) => {
      set((state) => ({
        todos:
          query.trim() === ""
            ? state.initialTodos // Return all todos if query is empty
            : state.todos.filter(
                (todo) =>
                  todo.title.toLowerCase().includes(query.toLowerCase()) ||
                  todo.content.toLowerCase().includes(query.toLowerCase())
              ),
      }));
    },
  };
});

export default useTodoStore;
