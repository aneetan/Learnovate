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
  const [loading, setLoading] = useState(true);

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

  // Fetch initial unread notifications
  useEffect(() => {
    if (!adminEmail) return;

    const fetchUnreadNotifications = async () => {
      try {
        const response = await fetch(`${API_URL}/notifications?email=${adminEmail}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch notifications');
        }
        
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnreadNotifications();
  }, [adminEmail, token]);

  // WebSocket connection setup
  useEffect(() => {
    if (!token || !adminEmail) return;

    const socket = new SockJS(`${API_URL}/ws`);
    const client = Stomp.over(socket);
    
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

  // WebSocket subscription for real-time notifications
  useEffect(() => {
    if (stompClient && stompClient.connected && adminEmail) {
      const subscription = stompClient.subscribe(
        `/user/${adminEmail}/queue/notifications`,
        (message) => {
          try {
            const notification = JSON.parse(message.body);
            setNotifications(prev => [notification, ...prev]);
          } catch (e) {
            console.error('Error parsing notification:', e);
          }
        },
        { Authorization: `Bearer ${token}` }
      );

      return () => subscription.unsubscribe();
    }
  }, [stompClient, adminEmail, token]);

  const handleMarkAsRead = async (notificationId) => {
    try {
      // Optimistic UI update
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
      );

      // Mark as read via WebSocket if available
      if (stompClient && stompClient.connected) {
        stompClient.send(
          "/app/notifications/mark-as-read",
          { 'Authorization': `Bearer ${token}` },
          JSON.stringify({ id: notificationId })
        );
      } else {
        // Fallback to HTTP API
        const response = await fetch(`${API_URL}/notifications/${notificationId}/read`, {
          method: 'POST'
        });
        
        if (!response.ok) {
          throw new Error('Failed to mark as read');
        }
      }
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Revert optimistic update on error
      setNotifications(prev => 
        prev.map(n => n.id === notificationId ? { ...n, read: false } : n)
      );
    }
  };

  if (loading) {
    return <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6">Loading notifications...</div>;
  }

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