import React, { useEffect } from "react";

const Toast = ({ message, type = "info", show, duration = 2000, onClose }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose && onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);

  if (!show) return null;

  let bgColor = "bg-gray-800";
  if (type === "success") bgColor = "bg-green-500";
  if (type === "error") bgColor = "bg-red-500";
  if (type === "info") bgColor = "bg-blue-500";

  return (
    <div className={`fixed top-6 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-300 ${show ? 'opacity-100' : 'opacity-0'} ${bgColor} text-white px-6 py-3 rounded-xl shadow-lg flex items-center gap-2`}
      role="alert"
      aria-live="assertive"
    >
      {message}
    </div>
  );
};

export default Toast; 