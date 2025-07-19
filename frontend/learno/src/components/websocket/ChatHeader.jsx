import React from 'react';

const ChatHeader = ({ otherDetails }) => {
  if (!otherDetails) return null;
  return (
    <div className="flex items-center p-4 border-b border-gray-200 bg-white">
      <div className="rounded-full bg-indigo-100 flex items-center justify-center mr-3">
        {otherDetails.profileUrl ? (
          <img
            src={otherDetails.profileUrl}
            alt="profile"
            className="w-12 h-12 rounded-full"
          />
        ) : (
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
  );
};

export default ChatHeader;