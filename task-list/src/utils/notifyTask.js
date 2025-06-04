export const notifyTaskDue = (task) => {
  if (!('Notification' in window)) return;

  const dueDate = new Date(task.dueDate);
  const now = new Date();
  const diff = dueDate.getTime() - now.getTime();

  if (diff > 0 && diff < 3600000) { // Less than 1 hour
    setTimeout(() => {
      new Notification('Task Reminder', {
        body: `🕒 "${task.title}" is due soon!`,
        icon: '/favicon.ico',
      });
    }, diff);
  }
};
