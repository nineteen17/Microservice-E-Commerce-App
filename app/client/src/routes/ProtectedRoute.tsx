import React, { ReactNode } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';

interface ProtectedRouteProps {
  children?: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children ? <>{children}</> : <Outlet />;
};

export default ProtectedRoute;

