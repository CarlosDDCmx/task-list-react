import TaskCard from '../TaskCard';
import { useTasks } from '../../contexts/TaskContext';

export default function TaskTracker() {
  const { tasks } = useTasks();

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Task Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tasks.length === 0 ? (
          <p>No tasks found. Add a new one!</p>
        ) : (
          tasks.map(task => <TaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
