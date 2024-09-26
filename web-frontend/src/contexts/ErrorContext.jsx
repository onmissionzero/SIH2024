import React, { createContext, useContext, useEffect, useState } from 'react';
import { database, ref, onValue } from '../utils/firebasedb';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const errorsRef = ref(database, 'errors');

    const handleValueChange = (snapshot) => {
      const data = snapshot.val();
      setErrors(data || {});
      setLoading(false);
    };

    const handleError = (err) => {
      console.error("Error fetching data: ", err);
      setLoading(false);
    };

    const unsubscribe = onValue(errorsRef, handleValueChange, handleError);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <ErrorContext.Provider value={{ errors, loading }}>
      {children}
    </ErrorContext.Provider>
  );
};
