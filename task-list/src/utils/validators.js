export const validateTask = ({ title, dueDate }) => {
  const errors = {};
  if (!title || title.trim() === '') errors.title = 'Title is required.';
  if (!dueDate) errors.dueDate = 'Due date is required.';
  return errors;
};
