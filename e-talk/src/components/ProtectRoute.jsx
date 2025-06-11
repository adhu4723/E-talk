import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function ProtectRoute() {
  const { user, authReady } = useContext(AuthContext);

  if (!authReady) {
    return <div>Loading...</div>; // or a spinner component
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectRoute;
