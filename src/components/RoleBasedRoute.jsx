import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');
  const userType = localStorage.getItem('type');

  // First check if user is authenticated
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Then check if user has the required role
  if (!userType || !allowedRoles.includes(userType)) {
    // Redirect to appropriate page based on role
    switch (userType) {
      case 'admin':
        return <Navigate to="/dashboard" replace />;
      case 'editor':
        return <Navigate to="/dashboard/articles" replace />;
      case 'viewer':
        return <Navigate to="/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return <ProtectedRoute>{children}</ProtectedRoute>;
};

export default RoleBasedRoute; 