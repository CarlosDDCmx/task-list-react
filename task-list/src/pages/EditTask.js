import { useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';

export default function EditTask() {
  const { id } = useParams();

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Edit Task</h1>
      <TaskForm taskId={id} />
    </div>
  );
}
