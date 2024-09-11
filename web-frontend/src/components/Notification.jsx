import React from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { notifications } = useNotification();

  if (notifications.length === 0) return null;

  return (
    <div className="notification-container">
      {notifications.map((notification, index) => (
        <div
          key={index}
          className={`notification ${notification.type}`}
          // Assuming you have CSS classes for different notification types
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
