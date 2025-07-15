import React, { useState, useEffect } from 'react';
import { FaTimes, FaSave } from 'react-icons/fa';

const EditModal = ({ isOpen, onClose, onSave, data, type = 'user' }) => {
  const [form, setForm] = useState(data || {});

  useEffect(() => {
    setForm(data || {});
  }, [data]);

  if (!isOpen || !data) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  let fields = null;
  if (type === 'feedback') {
    fields = (
      <>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input name="name" value={form.name || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Category</label>
          <input name="category" value={form.category || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Rating</label>
          <input name="rating" type="number" min="1" max="5" value={form.rating || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Message</label>
          <textarea name="message" value={form.message || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" rows={3} />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input name="date" value={form.date || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
      </>
    );
  } else if (type === 'booking') {
    fields = (
      <>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Booking ID</label>
          <input name="id" value={form.id || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" disabled />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Mentor</label>
          <input name="mentor" value={form.mentor || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Mentee</label>
          <input name="bookedBy" value={form.bookedBy || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Date</label>
          <input name="date" value={form.date || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Time</label>
          <input name="time" value={form.time || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Status</label>
          <input name="status" value={form.status || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
      </>
    );
  } else if (type === 'mentor') {
    fields = (
      <>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input name="name" value={form.name || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Contact</label>
          <input name="contact" value={form.contact || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Interest Area</label>
          <input name="interestArea" value={form.interestArea || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
      </>
    );
  } else {
    // user
    fields = (
      <>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Name</label>
          <input name="name" value={form.name || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Contact</label>
          <input name="contact" value={form.contact || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm text-gray-600 mb-1">Interest Area</label>
          <input name="interestArea" value={form.interestArea || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
        </div>
        {form.status && (
          <div>
            <label className="block text-sm text-gray-600 mb-1">Status</label>
            <input name="status" value={form.status || ''} onChange={handleChange} className="w-full border border-gray-300 rounded-lg px-3 py-2" />
          </div>
        )}
      </>
    );
  }

  let modalTitle = 'Edit Details';
  if (type === 'feedback') modalTitle = 'Edit Feedback';
  else if (type === 'booking') modalTitle = 'Edit Booking';
  else if (type === 'mentor') modalTitle = 'Edit Mentor';
  else if (type === 'user') modalTitle = 'Edit User';

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">{modalTitle}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors" type="button">
            <FaTimes className="w-6 h-6" />
          </button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto max-h-[60vh]">
          {fields}
        </div>
        <div className="flex items-center justify-end p-6 border-t border-gray-200 bg-gray-50 space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center space-x-2"
            style={{ backgroundColor: 'var(--primary-color)' }}
          >
            <FaSave className="w-4 h-4" />
            <span>Save</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditModal; 