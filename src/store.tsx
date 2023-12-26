import create from "zustand";
import { v4 as uuidv4 } from "uuid";

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

const useTodoStore = create<TodoState>((set) => ({
  initialTodos: [],
  todos: [],
  addTodo: (title, content, priority, dueDate) =>
    set((state) => ({
        initialTodos: [...state.initialTodos, { id: uuidv4(), title, content, priority, done: false, dueDate }],
      todos: [
        ...state.todos,
        { id: uuidv4(), title, content, priority, done: false, dueDate },
      ],
    })),
  toggleDone: (id) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      ),
    })),
  editTodo: (id, title, content, priority, dueDate) =>
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, title, content, priority, dueDate } : todo
      ),
    })),
  deleteTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
  sortByPriority: () =>
    set((state) => ({
      todos: [...state.todos].sort((a, b) => a.priority - b.priority),
    })),
  sortByDueDate: () =>
    set((state) => ({
      todos: [...state.todos].sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
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
}));

export default useTodoStore;
