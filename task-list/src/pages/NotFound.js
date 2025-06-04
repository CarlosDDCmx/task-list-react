import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center text-center px-4">
      <h1 className="text-6xl font-extrabold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">Page not found</h2>
      <p className="text-gray-600 mb-6">
        The page you are looking for doesn't exists or has been moved.
      </p>

      <Link
        to="/"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Back to main page
      </Link>
    </div>
  );
}
