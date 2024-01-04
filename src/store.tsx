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
  doneTodos: Todo[];
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
}

const useTodoStore = create<TodoState>((set) => {
  const initialState = loadFromLocalStorage("todos") || [];
  const initialDoneState = loadFromLocalStorage("doneTodos") || [];

  return {
    initialTodos: [],
    todos: initialState,
    doneTodos: initialDoneState,
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
    toggleDone: (id) => {
      set((state) => {
        let updatedTodos, updatedDoneTodos;
        if (state.todos.some(todo => todo.id === id)) {
          updatedTodos = state.todos.filter(todo => todo.id !== id);
          updatedDoneTodos = [...state.doneTodos, ...state.todos.filter(todo => todo.id === id).map(todo => ({ ...todo, done: true }))];
        } else {
          updatedDoneTodos = state.doneTodos.filter(todo => todo.id !== id);
          updatedTodos = [...state.todos, ...state.doneTodos.filter(todo => todo.id === id).map(todo => ({ ...todo, done: false }))];
        }
        saveToLocalStorage("todos", updatedTodos);
        saveToLocalStorage("doneTodos", updatedDoneTodos);
        return { todos: updatedTodos, doneTodos: updatedDoneTodos };
      });
    },
    editTodo: (id, title, content, priority, dueDate) => {
      set((state) => {
        const updatedTodos = state.todos.map((todo) =>
          todo.id === id ? { ...todo, title, content, priority, dueDate } : todo
        );
        saveToLocalStorage("todos", updatedTodos);
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
            ? state.initialTodos
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
