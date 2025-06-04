import { Navigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { TaskProvider } from './contexts/TaskContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { useNotifications } from './hooks/useNotifications';
import Layout from './components/common/Layout';
import Dashboard from './pages/Dashboard';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Register from './pages/Register';

// Protect routes
function PrivateRoute({ children }) {
  useNotifications();
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <TaskProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="add-task" element={<PrivateRoute><AddTask /></PrivateRoute>} />
              <Route path="task/:id" element={<PrivateRoute><EditTask /></PrivateRoute>} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
      </TaskProvider>
    </AuthProvider>
  );
}

export default App;