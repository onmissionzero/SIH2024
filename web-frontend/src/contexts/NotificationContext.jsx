import React, { createContext, useState, useContext, useCallback } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);

    const addNotification = useCallback((message, type = 'info') => {
        const id = new Date().getTime();
        setNotifications((prevNotifications) => [
            ...prevNotifications,
            { id, message, type }
        ]);
        
        setTimeout(() => {
            setNotifications((prevNotifications) =>
                prevNotifications.filter((notification) => notification.id !== id)
            );
        }, 5000); // Notification duration
    }, []);

    return (
        <NotificationContext.Provider value={{ addNotification }}>
            {children}
            <NotificationContainer notifications={notifications} />
        </NotificationContext.Provider>
    );
};

const NotificationContainer = ({ notifications }) => {
    return (
        <div className="fixed bottom-0 right-0 mb-4 mr-4 z-50">
            {notifications.map((notification) => (
                <div
                    key={notification.id}
                    className={`p-4 mb-2 rounded-lg text-white ${getNotificationClass(notification.type)}`}
                >
                    {notification.message}
                </div>
            ))}
        </div>
    );
};

const getNotificationClass = (type) => {
    switch (type) {
        case 'error':
            return 'bg-red-500';
        case 'success':
            return 'bg-green-500';
        case 'warning':
            return 'bg-yellow-500';
        default:
            return 'bg-blue-500';
    }
};
