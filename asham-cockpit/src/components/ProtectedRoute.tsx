import { Navigate } from 'react-router-dom';
import { useAuth } from '../providers/AuthProvider';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <div className="centered-page">Authentifizierung wird geladen…</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
