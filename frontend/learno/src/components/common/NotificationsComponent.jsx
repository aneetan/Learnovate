import axios from 'axios';
import { useState, useEffect } from 'react';
import { FaBell, FaTimes } from 'react-icons/fa';
import { API_URL } from '../../config/config';
import { useNavigate } from 'react-router-dom';

const NotificationsComponent = ({ notifications: propNotifications = [], onMarkAsRead }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  // Merge incoming WebSocket notifications with local state
  useEffect(() => {
    if (propNotifications.length > 0) {
      setNotifications(prev => {
        // Filter out duplicates
        const newNotifications = propNotifications.filter(
          newNote => !prev.some(existingNote => existingNote.id === newNote.id)
        );
        return [...newNotifications, ...prev];
      });
    }
  }, [propNotifications]);

  const unreadCount = notifications.filter(n => !n.read).length;

   const handleNotificationClick = (notification) => {
    if (!notification.read && onMarkAsRead) {
      onMarkAsRead(notification.id);
    }
    navigate(`/mentor-profile/${notification.user.userId}`)
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return 'Just now';
    
    const now = new Date();
    const date = new Date(timestamp);
    const diffInHours = (now - date) / (1000 * 60 * 60);

    if (diffInHours < 1) {
      const minutes = Math.floor(diffInHours * 60);
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else if (diffInHours < 24) {
      const hours = Math.floor(diffInHours);
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else {
      return date.toLocaleDateString();
    }
  };

  return (
    <div className="relative">
      {/* Notification Bell Icon with Badge */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-full hover:bg-gray-200 relative"
        aria-label="Notifications"
      >
        <FaBell className="h-6 w-6 text-gray-600" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      {isOpen && (
        <div className="absolute left-4 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50 border border-gray-200">

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-6 text-center text-gray-500">
                No new notifications
              </div>
            ) : (
              <ul>
                {notifications.map((notification) => (
                  <li 
                    key={notification.id} 
                    className={`border-b border-gray-100 ${!notification.read ? 'bg-blue-50' : ''}`}
                  >
                     <button
                      onClick={() => handleNotificationClick(notification)}
                      className="w-full text-left px-4 py-3 hover:bg-gray-50"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {notification.message || `You have a new request from ${notification.name || 'a user'}`}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {formatTime(notification.timestamp)}
                          </p>
                        </div>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="px-4 py-2 bg-gray-50 text-center border-t border-gray-200">
            <a href="/notifications" className="text-sm text-blue-600 hover:text-blue-800">
              View all notifications
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationsComponent;