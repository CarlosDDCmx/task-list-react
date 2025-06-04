import { Link, useLocation } from 'react-router-dom';

export default function AuthFooterLink() {
  const { pathname } = useLocation();
  const isLogin = pathname === '/login';

  return (
    <p className="text-sm text-center mt-4">
      {isLogin ? (
        <>
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline">Register</Link>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">Log in</Link>
        </>
      )}
    </p>
  );
}
