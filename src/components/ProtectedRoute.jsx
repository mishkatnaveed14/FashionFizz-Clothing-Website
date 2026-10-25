import React from 'react';
import { Navigate } from 'react-router-dom';
import { useStore } from '../lib/store';

export default function ProtectedRoute({ role, children }) {
  const { user } = useStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role && user.role !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return children;
}
