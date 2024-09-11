import React, { createContext, useContext, useState, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((message, type) => {
    const id = Date.now(); // Unique ID for each notification

    setNotifications(prevNotifications => [
      ...prevNotifications,
      { id, message, type }
    ]);

    // Remove the notification after 3 seconds
    setTimeout(() => {
      setNotifications(prevNotifications => 
        prevNotifications.filter(notification => notification.id !== id)
      );
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
