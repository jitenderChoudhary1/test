import React from 'react';
import { Navigate } from 'react-router-dom';
import NavBar from './NavBar';

const PrivateRoute = ({ children }) => {
  const user_info = JSON.parse(localStorage.getItem("user"));

  if (!user_info) {
    return <Navigate to="/" />;
  }

  return <>
    <NavBar/>
    {children}
  </>
};

export default PrivateRoute;
