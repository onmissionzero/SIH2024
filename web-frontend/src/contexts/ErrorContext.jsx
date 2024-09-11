import React, { createContext, useContext, useEffect, useState } from 'react';
import { database, ref, onValue } from '../utils/firebasedb';
import { useNotification } from './NotificationContext';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotification();

  useEffect(() => {
    const errorsRef = ref(database, 'errors');

    const handleValueChange = (snapshot) => {
      const data = snapshot.val();
      setErrors(data || {});
      setLoading(false);
    };

    const handleError = (err) => {
      console.error("Error fetching data: ", err);
      addNotification("Failed to load error data", 'error'); // Trigger notification
      setLoading(false);
    };

    onValue(errorsRef, handleValueChange, handleError);

    return () => {
      // Cleanup if needed
    };
  }, [addNotification]);

  return (
    <ErrorContext.Provider value={{ errors, loading }}>
      {children}
    </ErrorContext.Provider>
  );
};
