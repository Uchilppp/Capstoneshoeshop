import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export default function ProtectedRoute({ children }) {
  const { accessToken } = useSelector((state) => state.user);
  const location = useLocation();

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
