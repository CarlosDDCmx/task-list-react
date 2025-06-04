import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isDev = process.env.REACT_APP_USE_DEV_USER === 'true';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-blue-600">📋 Task Tracker</div>
        <nav className="flex gap-4 text-sm font-medium">
          <Link
            to="/"
            className={`${
              location.pathname === '/' ? 'text-blue-700 underline' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            Dashboard
          </Link>
          <Link
            to="/add-task"
            className={`${
              location.pathname === '/add-task' ? 'text-blue-700 underline' : 'text-gray-700'
            } hover:text-blue-500`}
          >
            Add Task
          </Link>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:text-red-700"
          >
            Logout
          </button>
        </nav>
      </header>

      {/* Notifications / Dev Banner */}
      <div className="px-6 pt-4">
        {isDev && (
          <div className="mb-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 text-sm rounded">
            ⚠️ Dev Mode: Using local user <strong>{user?.email}</strong>
          </div>
        )}
      </div>

      {/* Main content */}
      <main className="px-6 py-4 flex-1">
        <Outlet />
      </main>
    </div>
  );
}
