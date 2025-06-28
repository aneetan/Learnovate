import { Stomp } from '@stomp/stompjs';
import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { API_URL } from '../config/config';
import { jwtDecode } from 'jwt-decode';
import NotificationsComponent from '../components/common/NotificationsComponent';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [stompClient, setStompClient] = useState(null);
  const token = localStorage.getItem("token");
  const [adminEmail, setAdminEmail] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setAdminEmail(decoded.email || 'admin@gmail.com');
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }
  }, [token]);

  useEffect(() => {
    if (!token || !adminEmail) return;

    const socket = new SockJS(`${API_URL}/ws`);
    const client = Stomp.over(socket);
    
    // For debugging only
    client.debug = (msg) => console.log('STOMP:', msg);
    
    client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('WebSocket connected for admin');
        setStompClient(client);
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );

    return () => {
      if (client.connected) {
        console.log('Disconnecting WebSocket');
        client.disconnect();
      }
    };
  }, [token, adminEmail]);

  useEffect(() => {
  if (stompClient && stompClient.connected && adminEmail) {
    const subscription = stompClient.subscribe(
      `/user/${adminEmail}/queue/notifications`,
      (message) => {
        try {
          const notification = JSON.parse(message.body);
          setNotifications((prev) => [...prev, notification]);
        } catch (e) {
          console.error('Error parsing notification:', e);
          setNotifications((prev) => [...prev, message.body]);
        }
      },
      { Authorization: `Bearer ${token}` }
    );

    return () => subscription.unsubscribe();
  }
}, [stompClient, adminEmail, token]);

  const handleMarkAsRead = (notificationId) => {
    // Implement logic to mark notification as read in backend
    // For example:
    // stompClient.send("/app/notifications/read", {}, JSON.stringify({ id: notificationId }));
  };


  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">
       <NotificationsComponent
        notifications={notifications} 
        onMarkAsRead={handleMarkAsRead}
      />
    </div>
  );
};

export default AdminNotifications;