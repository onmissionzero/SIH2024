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
      console.log('Data received from Firebase:', data); // Debugging line
      setErrors(data || {});
      setLoading(false);

      // Add notification if there is new data
      if (data && Object.keys(data).length > 0) {
        addNotification("New error data received", 'info'); // Trigger notification
      }
    };

    const handleError = (err) => {
      console.error("Error fetching data: ", err);
      addNotification("Failed to load error data", 'error'); // Trigger notification
      setLoading(false);
    };

    const unsubscribe = onValue(errorsRef, handleValueChange, handleError);

    return () => {
      unsubscribe(); // Cleanup the subscription
    };
  }, [addNotification]);

  return (
    <ErrorContext.Provider value={{ errors, loading }}>
      {children}
    </ErrorContext.Provider>
  );
};
