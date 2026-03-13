import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useToast } from './Toast';

const ProtectedRoute = ({ children, isAdminRequired = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const { showToast } = useToast();

  const isDenied = isAdminRequired && isAuthenticated && (!user || !user.isAdmin);

  useEffect(() => {
    if (isDenied) {
      showToast('Access Denied: You must be an admin to view this page.', 'error');
    }
  }, [isDenied, showToast]);

  if (!isAuthenticated) {
    // If not logged in, redirect to login page with the return url
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (isDenied) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
