import React from 'react';

const ChatSidebar = ({ chatHistory, roomId, onSelectChat }) => (
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
          key={chat.id}
          className={`flex items-center p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
            chat.id === roomId ? 'bg-indigo-50' : ''
          }`}
          onClick={() => onSelectChat(chat.id, chat.partner)}
        >
          <div className="w-[20%] h-10 border-none flex items-center justify-center mr-3">
            {chat.partner?.profileUrl ? (
              <img
                src={chat.partner.profileUrl}
                alt="profile"
                className="w-12 h-12 rounded-full"
              />
            ) : (
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
);

export default ChatSidebar;