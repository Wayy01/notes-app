import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const YourComponent = () => {
  const { user } = useAuth();

  // ... rest of your component code ...
};

export default YourComponent;
