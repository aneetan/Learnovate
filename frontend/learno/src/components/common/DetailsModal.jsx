import React, { useState } from 'react';
import { FaTimes, FaEdit, FaSave, FaStar, FaTrash } from 'react-icons/fa';
import ConfirmationModal from './ConfirmationModal';

const DetailsModal = ({ isOpen, onClose, userData, type = 'user', onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState(userData || {});
  const [showConfirm, setShowConfirm] = useState(false);

  if (!isOpen || !userData) return null;

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setForm(userData);
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSave = () => {
    setIsEditing(false);
    // Optionally: onSave(form)
  };
  const handleDelete = () => {
    setShowConfirm(true);
  };
  const handleConfirmDelete = () => {
    setShowConfirm(false);
    if (onDelete) onDelete(userData);
    onClose();
  };

  // Render fields based on type
  let fields = null;
  if (type === 'feedback') {
    fields = (
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <div className="text-gray-900 font-medium">{userData.name}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <div className="text-gray-900">{userData.email}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          {isEditing ? (
            <input
              name="category"
              value={form.category || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-900">{userData.category}</div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Rating</label>
          <div className="flex items-center space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <FaStar key={i} className={`w-4 h-4 ${i < (userData.rating || 0) ? 'text-yellow-400' : 'text-gray-300'}`} />
            ))}
            <span className="ml-2 text-gray-700 font-medium">{userData.rating}/5</span>
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Message</label>
          {isEditing ? (
            <textarea
              name="message"
              value={form.message || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          ) : (
            <div className="text-gray-900 whitespace-pre-line">{userData.message}</div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <div className="text-gray-900">{userData.date}</div>
        </div>
      </div>
    );
  } else if (type === 'booking') {
    fields = (
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Booking ID</label>
          <div className="text-gray-900 font-medium">{userData.id}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Mentor</label>
          <div className="text-gray-900">{userData.mentor}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Mentee</label>
          <div className="text-gray-900">{userData.bookedBy}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <div className="text-gray-900">{userData.date}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Time</label>
          <div className="text-gray-900">{userData.time}</div>
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          {isEditing ? (
            <input
              name="status"
              value={form.status || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-900">{userData.status}</div>
          )}
        </div>
      </div>
    );
  } else {
    // user or mentor
    fields = (
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          {isEditing ? (
            <input
              name="name"
              value={form.name || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-900 font-medium">{userData.name}</div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          {isEditing ? (
            <input
              name="email"
              value={form.email || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-900">{userData.email}</div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Contact</label>
          {isEditing ? (
            <input
              name="contact"
              value={form.contact || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-900">{userData.contact}</div>
          )}
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Interest Area</label>
          {isEditing ? (
            <input
              name="interestArea"
              value={form.interestArea || ''}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ) : (
            <div className="text-gray-900">{userData.interestArea}</div>
          )}
        </div>
        {userData.status && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            {isEditing ? (
              <input
                name="status"
                value={form.status || ''}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            ) : (
              <div className="text-gray-900">{userData.status}</div>
            )}
          </div>
        )}
      </div>
    );
  }

  // Modal title
  let modalTitle = 'Details';
  if (type === 'feedback') modalTitle = 'Feedback Details';
  else if (type === 'booking') modalTitle = 'Booking Details';
  else if (type === 'mentor') modalTitle = 'Mentor Details';
  else if (type === 'user') modalTitle = 'User Details';

  return (
    <>
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(userData?.name || modalTitle)}&background=6366f1&color=fff&size=48`}
                  alt={userData?.name || modalTitle}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
                <p className="text-sm text-gray-600">
                  {userData?.id ? `ID: ${userData.id}` : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
            {fields}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-6 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-3">
              {(type === 'mentor' || type === 'booking' || type === 'feedback') && !isEditing && (
                <button
                  onClick={handleEdit}
                  className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center space-x-2"
                  style={{ backgroundColor: 'var(--primary-color)' }}
                >
                  <FaEdit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center space-x-2"
                    style={{ backgroundColor: 'var(--primary-color)' }}
                  >
                    <FaSave className="w-4 h-4" />
                    <span>Save</span>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </>
              )}
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm font-medium text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors flex items-center space-x-2"
              >
                <FaTrash className="w-4 h-4" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ConfirmationModal
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmDelete}
        message={`Are you sure you want to delete this ${type}? This action cannot be undone.`}
      />
    </>
  );
};

export default DetailsModal; 