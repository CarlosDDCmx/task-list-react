import { useState, useEffect } from 'react';
import { useTasks } from '../../contexts/TaskContext';
import { useNavigate, useParams } from 'react-router-dom';
import { validateTask } from '../../utils/validators';
import { v4 as uuidv4 } from 'uuid';
import { useNotifications } from '../../hooks/useNotifications';

export default function TaskForm() {
  const { tasks, addTask, updateTask } = useTasks();
  const navigate = useNavigate();
  const { id } = useParams();
  const notify = useNotifications();

  const isEditMode = Boolean(id);
  const existingTask = tasks.find((t) => t.id === id);

  const [form, setForm] = useState({
    title: '',
    description: '',
    dueDate: '',
    completed: false,
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    if (isEditMode && existingTask) {
      setForm(existingTask);
    }
  }, [id, existingTask, isEditMode]);

  useEffect(() => {
    const validationErrors = validateTask(form);
    setErrors(validationErrors);
    setIsValid(Object.keys(validationErrors).length === 0);
  }, [form]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;

    setForm((prev) => ({ ...prev, [name]: newValue }));

    let error = '';
    if (name === 'title') {
      if (!newValue.trim()) error = 'Title is required';
      else if (newValue.length > 100) error = 'Title must be under 100 characters';
    }
    if (name === 'description' && newValue.length > 300) {
      error = 'Description must be under 300 characters';
    }

    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validateTask(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    if (isEditMode) {
      updateTask({ ...form, id });
      notify('Task updated successfully!', 'success');
    } else {
      addTask({ ...form, id: uuidv4() });
      notify('Task created successfully!', 'success');
    }

    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-md mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {isEditMode ? 'Edit Task' : 'Create New Task'}
      </h2>

      {/* Title */}
      <div>
        <label className="block font-medium mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          maxLength={100}
          className={`w-full p-2 border rounded ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="text-sm text-gray-500 text-right">{form.title.length}/100</div>
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
      </div>

      {/* Description */}
      <div>
        <label className="block font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          maxLength={300}
          className={`w-full p-2 border rounded ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        <div className="text-sm text-gray-500 text-right">{form.description.length}/300</div>
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
      </div>

      {/* Due Date */}
      <div>
        <label className="block font-medium mb-1">Due Date</label>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className={`w-full p-2 border rounded ${
            errors.dueDate ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.dueDate && <p className="text-red-600 text-sm mt-1">{errors.dueDate}</p>}
      </div>

      {/* Completed */}
      <div className="flex items-center">
        <input
          type="checkbox"
          name="completed"
          checked={form.completed}
          onChange={handleChange}
          className="mr-2"
        />
        <label>Mark as completed</label>
      </div>

      <button
        type="submit"
        disabled={!isValid}
        className={`w-full py-2 px-4 rounded text-white font-medium ${
          isValid
            ? 'bg-blue-600 hover:bg-blue-700'
            : 'bg-gray-400 cursor-not-allowed'
        }`}
      >
        {isEditMode ? 'Update Task' : 'Create Task'}
      </button>
    </form>
  );
}
