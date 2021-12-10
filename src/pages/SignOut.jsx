import useAuth from '../hooks/useAuth';
import { Navigate } from 'react-router-dom';

export const SignOut = () => {
  const { onSignOut } = useAuth();

  onSignOut();
  return <Navigate to="/" replace />;
};
