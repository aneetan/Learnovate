import React, { useRef, useEffect } from 'react';

const ChatMessages = ({ messages, currentUser, otherDetails }) => {
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!messages) return null;

  return (
    <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
      {messages.length === 0 ? (
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
                msg.sender.userId === currentUser.id ? 'flex-row-reverse' : ''
              }`}
            >
              <div className="flex-shrink-0 mx-2">
                <div className="rounded-full bg-indigo-100 flex items-center justify-center">
                  {msg.sender.userId !== currentUser.id && (
                    <img
                      src={otherDetails.profileUrl || ''}
                      alt="profile"
                      className="w-8 h-8 rounded-full"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = '';
                        e.target.parentElement.innerHTML =
                          otherDetails.user?.name?.charAt(0)?.toUpperCase() ||
                          '?';
                      }}
                    />
                  )}
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
  );
};

export default ChatMessages;