export const isOverdue = (dueDate) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const taskDate = new Date(dueDate).setHours(0, 0, 0, 0);
  return taskDate < today;
};

export const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};
