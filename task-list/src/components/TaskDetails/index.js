import { useParams, useNavigate } from 'react-router-dom';
import { useTasks } from '../../contexts/TaskContext';
import { useState } from 'react';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, updateTask, deleteTask } = useTasks();
  const task = tasks.find(t => t.id === id);

  const [title, setTitle] = useState(task?.title || '');
  const [dueDate, setDueDate] = useState(task?.dueDate || '');
  const [completed, setCompleted] = useState(task?.completed || false);

  const handleUpdate = () => {
    updateTask({ ...task, title, dueDate, completed });
    navigate('/');
  };

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/');
    }
  };

  if (!task) return <p className="p-4">Task not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Edit Task</h2>
      <div className="space-y-4">
        <input
          type="text"
          className="w-full p-2 border rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={() => setCompleted(!completed)}
          />
          <span>Mark as Completed</span>
        </label>
        <div className="flex gap-4">
          <button onClick={handleUpdate} className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Save
          </button>
          <button onClick={handleDelete} className="bg-red-600 text-white py-2 px-4 rounded hover:bg-red-700">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
