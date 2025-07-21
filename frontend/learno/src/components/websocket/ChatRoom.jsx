import React, { useEffect, useState, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import axios from 'axios';
import { API_URL } from '../../config/config';

const ChatRoom = ({ currentUser, roleDetails, receiverId = null }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [roomId, setRoomId] = useState(null);
  const [error, setError] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const stompClient = useRef(null);
  const messagesEndRef = useRef(null);
  const [otherDetails, setOtherDetails] = useState('');
  const [otherUser, setOtherUser] = useState('');

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Fetch partner details
  const fetchPartnerDetails = async (receiverId) => {
    try {
      const endpoint =
        currentUser.role === 'mentee'
          ? `${API_URL}/auth/getMentor/${receiverId}`
          : `${API_URL}/auth/getMentee/${receiverId}`;
      const response = await axios.get(endpoint);
      return response.data;
    } catch (err) {
      return {
        user: {
          name: '',
          role: '',
        },
        profileUrl: null,
      };
    }
  };

  // Fetch and enrich chat history with profileUrl/details
  useEffect(() => {
    let didCancel = false;
    const fetchAndEnrichHistory = async () => {
      setLoadingChats(true);
      try {
        // 1. Fetch chat history
        const res = await axios.get(`${API_URL}/rooms/user/${currentUser.id}`);
        let history = res.data;

        // 2. Enrich each chat with profileUrl/details if missing
        history = await Promise.all(
          history.map(async (chat) => {
            if (!chat.partner.profileUrl) {
              const details = await fetchPartnerDetails(chat.partner.userId);
              return {
                ...chat,
                partner: {
                  ...chat.partner,
                  profileUrl: details.profileUrl || null,
                  details,
                },
              };
            }
            return chat;
          })
        );

        if (!didCancel) {
          setChatHistory(history);
          setLoadingChats(false);
        }
      } catch (err) {
        if (!didCancel) {
          setLoadingChats(false);
          setError('Failed to load chat history.');
        }
      }
    };

    fetchAndEnrichHistory();
    return () => {
      didCancel = true;
    };
    // eslint-disable-next-line
  }, [currentUser.id]);

  // When chatHistory and receiverId are ready, select the chat or the first chat or create a new room if needed
  useEffect(() => {
    if (loadingChats) return;

    const selectOrCreate = async () => {
      if (receiverId) {
        let selectedChat = chatHistory.find(
          (chat) => String(chat.partner.userId) === String(receiverId)
        );
        if (selectedChat) {
          handleSelectChat(selectedChat.roomId, selectedChat.partner);
        } else {
          // No chat exists: create a new chat room
          await handleCreateChat(receiverId);
        }
      } else if (chatHistory.length > 0) {
        // No receiverId: default to first chat
        handleSelectChat(chatHistory[0].roomId, chatHistory[0].partner);
      }
    };
    selectOrCreate();
    // eslint-disable-next-line
  }, [receiverId, loadingChats, chatHistory.length]);

  // Select a chat and fetch its messages
  const handleSelectChat = async (selectedRoomId, partner) => {
    try {
      setRoomId(selectedRoomId);
      setOtherUser(partner);
      setMessages([]);
      setError(null);

      // Always set otherDetails from partner.details if available
      if (partner.details) {
        setOtherDetails(partner.details);
      } else if (partner.userId) {
        // Fallback: fetch if missing
        const details = await fetchPartnerDetails(partner.userId);
        setOtherDetails(details);
        // Update chatHistory with profileUrl/details for this partner
        setChatHistory((prev) =>
          prev.map((chat) =>
            chat.roomId === selectedRoomId
              ? {
                  ...chat,
                  partner: {
                    ...chat.partner,
                    profileUrl: details.profileUrl || null,
                    details,
                  },
                }
              : chat
          )
        );
      }

      // Load messages for the selected room
      const messagesResponse = await axios.get(
        `${API_URL}/rooms/${selectedRoomId}/messages`
      );
      setMessages(messagesResponse.data);

      // Unsubscribe from previous room and subscribe to new room
      if (stompClient.current?.connected) {
        stompClient.current.unsubscribe('room-subscription');
      }
      setupWebSocket(selectedRoomId);
    } catch (err) {
      setError('Failed to load chat messages.');
    }
  };

  // Set up WebSocket subscription for a room
  const setupWebSocket = (roomId) => {
    if (stompClient.current) {
      stompClient.current.deactivate();
    }

    const socket = new SockJS(`${API_URL}/ws`);
    stompClient.current = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      connectHeaders: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      onConnect: () => {
        stompClient.current.subscribe(
          `/topic/room/${roomId}`,
          (message) => {
            const newMsg = JSON.parse(message.body);
            setMessages((prev) => [...prev, newMsg]);
          },
          { id: 'room-subscription' }
        );
      },
      onStompError: (frame) => {
        setError('Connection error. Trying to reconnect...');
      },
      onWebSocketError: (err) => {
        setError('Connection error. Trying to reconnect...');
      },
    });
    stompClient.current.activate();
  };

  // Send a message
  const handleSendMessage = () => {
    if (!newMessage.trim()) {
      setError('Message cannot be empty');
      return;
    }
    if (!roomId) {
      setError('Please select a chat.');
      return;
    }
    if (!stompClient.current?.connected) {
      setError('Not connected to chat. Please wait or refresh.');
      return;
    }

    const message = {
      roomId: roomId,
      senderId: currentUser.id,
      recipientId: otherUser.userId,
      content: newMessage,
    };

    stompClient.current.publish({
      destination: '/app/chat.send',
      body: JSON.stringify(message),
    });
    setNewMessage('');
    setError(null);
  };

  // Create a new chat room if not found
  const handleCreateChat = async (receiverId) => {
    try {
      // Try to find an existing room first
      const findResponse = await axios.get(
        `${API_URL}/rooms/find/${currentUser.id}/${receiverId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );

      let roomData = findResponse.data.exists
        ? findResponse.data.room
        : (
            await axios.post(
              `${API_URL}/rooms/create/${currentUser.id}/${receiverId}`,
              {},
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('token')}`,
                  'Content-Type': 'application/json',
                },
              }
            )
          ).data;

      const partnerDetails = await fetchPartnerDetails(receiverId);
      const partner = {
        userId: partnerDetails.user?.userId,
        name: partnerDetails.user?.name || 'Unknown User',
        role: partnerDetails.user?.role || 'user',
        profileUrl: partnerDetails.profileUrl || null,
        details: partnerDetails,
      };

      setChatHistory((prev) => {
        const exists = prev.some((chat) => chat.id === roomData.roomId);
        return exists
          ? prev
          : [
              ...prev,
              {
                id: roomData.roomId,
                roomId: roomData.roomId,
                partner,
                lastMessage: null,
                lastMessageTime: new Date().toISOString(),
              },
            ];
      });

      handleSelectChat(roomData.roomId, partner);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Failed to establish chat connection. Please try again.'
      );
    }
  };

  // Render loading state while chats/profiles load
  if (loadingChats) {
    return (
      <div className="flex h-[82vh] bg-gray-100 items-center justify-center">
        <span className="text-gray-500">Loading chats...</span>
      </div>
    );
  }

  return (
    <div className="flex h-[82vh] bg-gray-100">
      {/* Sidebar with chat history */}
      <div className="w-80 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-3 border-b border-gray-200">
          <div className="relative">
            <input
              type="text"
              placeholder="Search chats..."
              className="w-full p-2 pl-8 rounded-md border border-gray-300 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <svg
              className="absolute left-2 top-3 h-4 w-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex-1 w-[full]">
          {chatHistory.map((chat) => (
            <div
              key={chat.roomId}
              className={`flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                chat.id === roomId ? 'bg-indigo-50' : ''
              }`}
              onClick={() => handleSelectChat(chat.roomId, chat.partner)}
            >
              <div className="w-[20%] h-10 border-none flex items-center justify-center mr-3">
                {chat.partner?.profileUrl && chat.partner.profileUrl.trim()
                  ? (
                    <img
                      src={chat.partner.profileUrl}
                      alt="profile"
                      className="w-12 h-12 rounded-full"
                    />
                  )
                  : (
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                      {chat.partner?.name?.charAt(0)?.toUpperCase() || '?'}
                    </div>
                  )}
              </div>
              <div className="flex-1 w-[80%]">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-900">
                    {chat.partner?.name || 'Unknown User'}
                  </h3>
                  <span className="w-[34%] text-xs text-gray-500">
                    {chat.lastMessageTime
                      ? new Date(chat.lastMessageTime).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })
                      : ''}
                  </span>
                </div>
                <p className="w-[85%] text-sm text-gray-500 truncate">
                  {chat.lastMessage || 'No messages yet'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div className="flex-1 flex flex-col">
        {/* Chat header */}
        {otherDetails && (
          <div className="flex items-center p-4 border-b border-gray-200 bg-white">
            <div className="rounded-full bg-indigo-100 flex items-center justify-center mr-3">
              {otherDetails.profileUrl && otherDetails.profileUrl.trim()
                ? (
                  <img
                    src={otherDetails.profileUrl}
                    alt="profile"
                    className="w-12 h-12 rounded-full"
                  />
                )
                : (
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                    {otherDetails.user?.name?.charAt(0)?.toUpperCase() || '?'}
                  </div>
                )}
            </div>
            <div>
              <h2 className="font-semibold text-gray-900">
                {otherDetails.user?.name || 'Unknown User'}
              </h2>
              <p className="text-xs text-gray-500">
                {otherDetails.user?.role?.charAt(0)?.toUpperCase() +
                  (otherDetails.user?.role?.slice(1)?.toLowerCase() || 'User')}{' '}
                • <span className="text-green-500"> Online</span>
              </p>
            </div>
          </div>
        )}

        {/* Messages area */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">

          {!roomId ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="mt-2">Select a chat to start messaging</p>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center text-gray-500">
                <svg
                  className="mx-auto h-12 w-12 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  />
                </svg>
                <p className="mt-2">No messages yet</p>
                <p className="text-sm">Start the conversation!</p>
              </div>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender.userId === currentUser.id
                    ? 'justify-end'
                    : 'justify-start'
                } mb-4`}
              >
                <div
                  className={`flex max-w-[80%] ${
                    msg.sender.userId === currentUser.id
                      ? 'flex-row-reverse'
                      : ''
                  }`}
                >
                  <div className="flex-shrink-0 mx-2">
                    <div className="rounded-full bg-indigo-100 flex items-center justify-center">
                      {msg.sender.userId !== currentUser.id &&
                        (otherDetails.profileUrl &&
                        otherDetails.profileUrl.trim() ? (
                          <img
                            src={otherDetails.profileUrl}
                            alt="profile"
                            className="w-8 h-8 rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                            {otherDetails.user?.name
                              ?.charAt(0)
                              ?.toUpperCase() || '?'}
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className={`p-3 rounded-lg ${
                      msg.sender.userId === currentUser.id
                        ? 'bg-[var(--primary-light)] text-white rounded-tr-none'
                        : 'bg-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <div className="text-sm">{msg.content}</div>
                    <div
                      className={`text-xs mt-1 ${
                        msg.sender.userId === currentUser.id
                          ? 'text-indigo-100'
                          : 'text-gray-500'
                      }`}
                    >
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message input */}
        {roomId && (
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex items-center">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type a message..."
                className="flex-1 p-2 mr-12 border rounded-xl border-gray-300 focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)]"
              />
              <button
                onClick={handleSendMessage}
                disabled={!newMessage.trim()}
                className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-r-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] disabled:bg-[var(--primary-lighter)]"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatRoom;