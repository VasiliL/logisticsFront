import React from 'react';
import { Navigate } from 'react-router-dom';
import authStore from '@src/store/AuthStore'; // Adjust the import path as necessary

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = authStore;

  if (!isAuthenticated) {
    return <Navigate to="/un-auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
