import React from 'react';
import { useUser } from './UserContext';
import HomePage from '../pages/HomePage';
import LoggedInHomePage from '../pages/LoggedInHomePage';

const ConditionalHomePage = () => {
  const { user } = useUser();

  return user ? <LoggedInHomePage /> : <HomePage />;
};

export default ConditionalHomePage;