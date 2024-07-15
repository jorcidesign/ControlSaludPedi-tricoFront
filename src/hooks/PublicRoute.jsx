import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const PublicRoute = ({ children }) => {
  const user = cookies.get('user');
  return user ? <Navigate to="/" /> : children;
};

export default PublicRoute;
