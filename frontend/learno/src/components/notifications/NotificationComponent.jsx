import React, { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';

const NotificationComponent = () => {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [isConnected, setIsConnected] = useState(false);
    const [stompClient, setStompClient] = useState(null);
    const [showPanel, setShowPanel] = useState(false);

    // Get auth token from your auth context or storage
    const authToken = localStorage.getItem('authToken');
    const userId = localStorage.getItem('userId'); // Get from your auth system

    useEffect(() => {
        const client = new Client({
            brokerURL: 'http://localhost:8080/api/ws',
            connectHeaders: {
                Authorization: `Bearer ${authToken}`
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            debug: (str) => console.debug('[STOMP]', str),
            onConnect: () => {
                setIsConnected(true);
                
                // Global notifications
                client.subscribe('/topic/global-notifications', (message) => {
                    const notification = JSON.parse(message.body);
                    addNotification(notification);
                });

                // User-specific notifications
                client.subscribe(`/user/queue/notifications`, (message) => {
                    const notification = JSON.parse(message.body);
                    addNotification(notification);
                });

                // Test notifications
                client.subscribe('/topic/test-notifications', (message) => {
                    const notification = JSON.parse(message.body);
                    addNotification(notification);
                });

                console.log('WebSocket Connected');
            },
            onDisconnect: () => {
                setIsConnected(false);
                console.log('WebSocket Disconnected');
            },
            onStompError: (frame) => {
                console.error('STOMP Error:', frame.headers.message);
            }
        });

        client.activate();
        setStompClient(client);

        return () => {
            if (client) {
                client.deactivate();
            }
        };
    }, [authToken, userId]);

    const addNotification = (notification) => {
        setNotifications(prev => [{
            ...notification,
            id: Date.now(), // Ensure unique ID
            timestamp: new Date(notification.timestamp || Date.now()),
            read: false
        }, ...prev]);
        
        setUnreadCount(prev => prev + 1);
        
        // Show desktop notification if browser tab is not active
        if (!document.hasFocus() && Notification.permission === 'granted') {
            new Notification(notification.title, {
                body: notification.message,
                icon: '/notification-icon.png'
            });
        }
    };

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(n => n.id === id ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(n => ({ ...n, read: true }))
        );
        setUnreadCount(0);
    };

    const requestNotificationPermission = () => {
        if ('Notification' in window) {
            Notification.requestPermission().then(permission => {
                console.log('Notification permission:', permission);
            });
        }
    };

    // Request notification permission on component mount
    useEffect(() => {
        requestNotificationPermission();
    }, []);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            {/* Notification Bell */}
            <button 
                onClick={() => setShowPanel(!showPanel)}
                className="relative p-3 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors"
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-6 w-6 text-gray-700" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" 
                    />
                </svg>
                
                {unreadCount > 0 && (
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                        {unreadCount}
                    </span>
                )}
                
                {/* Connection status indicator */}
                <span 
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        isConnected ? 'bg-green-500' : 'bg-red-500'
                    }`}
                    title={isConnected ? 'Connected' : 'Disconnected'}
                />
            </button>
            
            {/* Notification Panel */}
            {showPanel && (
                <div className="absolute right-0 bottom-full mb-2 w-80 bg-white rounded-lg shadow-xl overflow-hidden">
                    <div className="flex justify-between items-center p-3 bg-gray-800 text-white">
                        <h3 className="font-semibold">Notifications</h3>
                        <div className="flex space-x-2">
                            <button 
                                onClick={markAllAsRead}
                                className="text-xs hover:underline"
                                disabled={unreadCount === 0}
                            >
                                Mark all as read
                            </button>
                            <button 
                                onClick={() => setShowPanel(false)}
                                className="text-white hover:text-gray-300"
                            >
                                ×
                            </button>
                        </div>
                    </div>
                    
                    <div className="max-h-96 overflow-y-auto">
                        {notifications.length === 0 ? (
                            <div className="p-4 text-center text-gray-500">
                                No notifications yet
                            </div>
                        ) : (
                            notifications.map(notification => (
                                <div
                                    key={notification.id}
                                    onClick={() => markAsRead(notification.id)}
                                    className={`p-3 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                                        notification.read ? 'bg-white' : 'bg-blue-50'
                                    }`}
                                >
                                    <div className="flex justify-between items-start">
                                        <h4 className={`font-medium ${
                                            notification.read ? 'text-gray-700' : 'text-gray-900'
                                        }`}>
                                            {notification.title}
                                        </h4>
                                        <span className="text-xs text-gray-500">
                                            {new Date(notification.timestamp).toLocaleTimeString()}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        {notification.message}
                                    </p>
                                    {notification.type && (
                                        <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded-full bg-gray-200 text-gray-700">
                                            {notification.type}
                                        </span>
                                    )}
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
            
            {/* Toast Notifications */}
            {notifications.slice(0, 3).map(notification => (
                <div 
                    key={`toast-${notification.id}`}
                    className={`absolute right-0 bottom-full mb-2 w-80 p-3 rounded-lg shadow-md transition-all duration-300 ${
                        notification.read ? 'bg-gray-100' : 'bg-blue-50 border-l-4 border-blue-500'
                    }`}
                    style={{ display: showPanel ? 'none' : 'block' }}
                >
                    <div className="flex justify-between">
                        <h4 className="font-medium">{notification.title}</h4>
                        <button 
                            onClick={() => markAsRead(notification.id)}
                            className="text-gray-500 hover:text-gray-700"
                        >
                            ×
                        </button>
                    </div>
                    <p className="text-sm mt-1">{notification.message}</p>
                </div>
            ))}
        </div>
    );
};

export default NotificationComponent;