import React, { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const WebSocketClient = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [client, setClient] = useState(null);

    useEffect(() => {
        // Create a new STOMP client over SockJS
        const stompClient = new Client({
            webSocketFactory: () => new SockJS('http://localhost:8080/ws'),
            reconnectDelay: 5000,
            onConnect: () => {
                stompClient.subscribe('/topic/messages', (message) => {
                    const msg = JSON.parse(message.body);
                    setMessages((prev) => [...prev, msg.content]);
                });
            },
            onStompError: (frame) => {
                console.error('Broker error:', frame);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const sendMessage = () => {
        if (client && client.connected && input) {
            client.publish({
                destination: '/app/sendMessage',
                body: JSON.stringify({ content: input }),
            });
            setInput('');
        }
    };

    return (
        <div>
            <h1>WebSocket Chat</h1>
            <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type message..."
            />
            <button onClick={sendMessage}>Send</button>
            <ul>
                {messages.map((msg, i) => (
                    <li key={i}>{msg}</li>
                ))}
            </ul>
        </div>
    );
};

export default WebSocketClient;
