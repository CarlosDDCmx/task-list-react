import { useState } from 'react';
import TaskList from '../components/TaskList';

export default function Dashboard() {
  const isDevMode = process.env.REACT_APP_USE_DEV_USER === 'true';
  const [filter, setFilter] = useState('all');

  const filters = [
    { label: 'All', value: 'all' },
    { label: 'Pending', value: 'pending' },
    { label: 'Completed', value: 'completed' },
  ];

  return (
    <div className="max-w-4xl mx-auto mt-8 px-4">
      {isDevMode && (
        <div className="bg-yellow-100 text-yellow-800 text-sm p-2 text-center font-medium">
          ⚠️ You are using a temporary user in development mode
        </div>
      )}
      <div className="mb-6 flex gap-3 flex-wrap">
        <div className="bg-blue-100 p-4 rounded">Tailwind is working ✅</div>
        {filters.map((f) => (
          <button
            key={f.value}
            onClick={() => setFilter(f.value)}
            className={`px-4 py-1 rounded border 
              ${filter === f.value
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
              }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <TaskList filter={filter} />
    </div>
  );
}
