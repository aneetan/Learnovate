import React from 'react';

const ChatInput = ({
  newMessage,
  setNewMessage,
  handleSendMessage,
  disabled,
}) => (
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
        disabled={disabled || !newMessage.trim()}
        className="px-4 py-2 bg-[var(--primary-color)] text-white rounded-r-md hover:bg-[var(--primary-dark)] focus:outline-none focus:ring-1 focus:ring-[var(--primary-color)] disabled:bg-[var(--primary-lighter)]"
      >
        Send
      </button>
    </div>
  </div>
);

export default ChatInput;