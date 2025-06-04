import TaskForm from '../components/TaskForm';

export default function AddTask() {
  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Add New Task</h1>
      <TaskForm />
    </div>
  );
}
