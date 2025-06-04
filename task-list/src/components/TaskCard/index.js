import { useTasks } from '../../contexts/TaskContext';
import { useNavigate } from 'react-router-dom';
import { useConfirm } from '../../contexts/ConfirmContext';

export default function TaskCard({ task }) {
  const { deleteTask, toggleTask } = useTasks();
  const navigate = useNavigate();
  const confirm = useConfirm();

  
  const handleDelete = async () => {
    const confirmed = await confirm('Delete this task?');
    if (confirmed) {
      deleteTask(task.id);
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4 shadow hover:shadow-md transition">
      <div className="flex justify-between items-center">
        <h3 className={`text-lg font-semibold ${task.completed ? 'line-through text-gray-400' : ''}`}>
          {task.title}
        </h3>
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
          className="w-5 h-5 accent-blue-600"
        />
      </div>

      {task.description && (
        <p className="text-sm text-gray-600 mt-2">{task.description}</p>
      )}

      <p className="text-xs text-gray-500 mt-1">
        Due: {task.dueDate || '—'}
      </p>

      <div className="mt-4 flex gap-3 text-sm">
        <button
          onClick={() => navigate(`/task/${task.id}`)}
          className="text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="text-red-600 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
