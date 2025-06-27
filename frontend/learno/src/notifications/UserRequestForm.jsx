import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { API_URL } from '../config/config';
import { Stomp } from '@stomp/stompjs';
import { jwtDecode } from 'jwt-decode';

function UserRequestForm() {
  const [stompClient, setStompClient] = useState(null);
  const [userEmail, setUserEmail] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.email) {
          setUserEmail(decoded.email);
        }
      } catch (error) {
        console.error('Error decoding JWT:', error);
      }
    }  
  }, [token]);

  
    useEffect(() => {
      if (!token || !userEmail) return;

      const socket = new SockJS(`${API_URL}/ws`);
      const client = Stomp.over(socket);
      client.connect(
      { Authorization: `Bearer ${token}` },
      () => {
        console.log('WebSocket connected for user:', userEmail);
        setStompClient(client);
      },
      (error) => {
        console.error('WebSocket connection error:', error);
      }
    );
  
      return () => {
        if (client.connected) client.disconnect();
      };
    }, [token, userEmail]);

  const sendRequest = () => {
    if (stompClient && userEmail) {
      const request = {
        sender: userEmail,
        type: 'MENTOR_REQUEST',
      };
      stompClient.send(
        '/app/mentor-request',
        { 'content-type': 'application/json', Authorization: `Bearer ${token}` },
        JSON.stringify(request)
      );
      console.log('Sent mentor request:', request);
    }
  };

  return (
     <div className="w-full max-w-md bg-white rounded-lg shadow-md p-6 mb-4">
      <h2 className="text-xl font-semibold mb-4">Submit Mentor Request</h2>
      <p>User: {userEmail || 'Not logged in'}</p>
      <button
        onClick={sendRequest}
        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
      >
        Send Mentor Request
      </button>
    </div>
  );
}

export default UserRequestForm;