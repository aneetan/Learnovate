import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { Stomp } from '@stomp/stompjs';
import { API_URL } from '../config/config';

function Notifications() {
  const [chatMessages, setChatMessages] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('');
  let stompClient = null;

  useEffect(() => {
    // Connect to the WebSocket endpoint
    const socket = new SockJS(`${API_URL}/ws`);
    stompClient = Stomp.over(socket);
    stompClient.connect({}, () => {
      // Subscribe to notifications
      stompClient.subscribe('/topic/notifications', (message) => {
        setNotifications((prev) => [...prev, message.body]);
      });
    });

    return () => {
      if (stompClient) stompClient.disconnect();
    };
  }, []);

  const sendChatMessage = () => {
    if (message.trim() && stompClient) {
      stompClient.send('/app/chat', {}, message); // Adjust destination if needed
      setMessage('');
    }
  };

  const sendNotification = async () => {
    if (message.trim()) {
      try {
        await axios.post(`${API_URL}/notify`, message, {
          headers: { 'Content-Type': 'text/plain' },
        });
        setMessage('');
      } catch (error) {
        console.error('Error sending notification:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold mb-6">Chat and Notifications</h1>
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message or notification"
          className="w-full p-2 border rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <div className="flex space-x-2">
          <button
            onClick={sendChatMessage}
            className="w-full bg-green-500 text-white p-2 rounded-md hover:bg-green-600"
          >
            Send Chat
          </button>
          <button
            onClick={sendNotification}
            className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
          >
            Send Notification
          </button>
        </div>
      </div>
      <div className="w-full max-w-2xl grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Chat Messages</h2>
          {chatMessages.length === 0 ? (
            <p className="text-gray-500">No chat messages yet.</p>
          ) : (
            <ul className="space-y-2">
              {chatMessages.map((msg, index) => (
                <li key={index} className="bg-white p-3 rounded-md shadow-sm">
                  {msg}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Notifications</h2>
          {notifications.length === 0 ? (
            <p className="text-gray-500">No notifications yet.</p>
          ) : (
            <ul className="space-y-2">
              {notifications.map((note, index) => (
                <li key={index} className="bg-white p-3 rounded-md shadow-sm">
                  {note}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notifications;