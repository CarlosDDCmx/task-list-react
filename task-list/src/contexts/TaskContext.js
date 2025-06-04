import { createContext, useContext, useEffect, useReducer } from 'react';
import { getStoredTasks, saveTasks } from '../services/taskStorage';
import { notifyTaskDue } from '../utils/notifyTask';

// Initial state
const initialState = [];

// Action types
const ACTIONS = {
  ADD: 'ADD_TASK',
  UPDATE: 'UPDATE_TASK',
  DELETE: 'DELETE_TASK',
  TOGGLE: 'TOGGLE_TASK',
  SET_ALL: 'SET_ALL_TASKS',
  REORDER: 'REORDER_TASKS',
};

// Reducer
function taskReducer(state, action) {
  switch (action.type) {
    case ACTIONS.SET_ALL:
      return action.payload;

    case ACTIONS.ADD:
      return [...state, action.payload];

    case ACTIONS.UPDATE:
      return state.map((task) =>
        task.id === action.payload.id ? action.payload : task
      );

    case ACTIONS.DELETE:
      return state.filter((task) => task.id !== action.payload);

    case ACTIONS.TOGGLE:
      return state.map((task) =>
        task.id === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
    
      case ACTIONS.REORDER:
        return action.payload;

    default:
      return state;
  }
}

// Context
export const TaskContext = createContext();

// Provider
export const TaskProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(taskReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    const storedTasks = getStoredTasks();
    dispatch({ type: ACTIONS.SET_ALL, payload: storedTasks });
  }, []);

  // Persist to localStorage
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      const parsed = JSON.parse(storedTasks);

      parsed.forEach((task) => {
        if (!task.completed) notifyTaskDue(task);
      });
    }
  }, []);

  // Action creators
  const addTask = (task) => dispatch({ type: ACTIONS.ADD, payload: task });
  const updateTask = (task) => dispatch({ type: ACTIONS.UPDATE, payload: task });
  const deleteTask = (id) => dispatch({ type: ACTIONS.DELETE, payload: id });
  const toggleTask = (id) => dispatch({ type: ACTIONS.TOGGLE, payload: id });

  const reorderTasks = (newOrder) => {
    dispatch({ type: ACTIONS.REORDER, payload: newOrder });
    localStorage.setItem('tasks', JSON.stringify(newOrder));
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTask,
        reorderTasks
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};


// Hook
export const useTasks = () => useContext(TaskContext);
