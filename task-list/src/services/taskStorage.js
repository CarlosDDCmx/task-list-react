const TASKS_KEY = 'task_tracker_tasks';

export const getStoredTasks = () => {
  try {
    const stored = localStorage.getItem(TASKS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
};

export const saveTasks = (tasks) => {
  try {
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
  } catch {
    console.error('Failed to save tasks.');
  }
};
