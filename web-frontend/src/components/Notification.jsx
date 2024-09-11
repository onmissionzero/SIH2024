import React, { useEffect, useState } from 'react';
import { useNotification } from '../contexts/NotificationContext';

const Notification = () => {
  const { notifications } = useNotification();
  const [localNotifications, setLocalNotifications] = useState(notifications);

  useEffect(() => {
    setLocalNotifications(notifications);
  }, [notifications]);

  return (
    <div className="notification-container">
      {localNotifications.map(notification => (
        <div
          key={notification.id}
          className={`notification ${notification.type} ${notification.dismissed ? 'fade-out' : ''}`}
        >
          {notification.message}
        </div>
      ))}
    </div>
  );
};

export default Notification;
