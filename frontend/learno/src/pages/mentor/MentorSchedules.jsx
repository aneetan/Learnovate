import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const daysOfWeek = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
];

const defaultAvailability = {
  Monday: { from: '09:00', to: '17:00', enabled: true },
  Tuesday: { from: '10:00', to: '16:00', enabled: true },
  Wednesday: { from: '09:00', to: '17:00', enabled: true },
  Thursday: { from: '11:00', to: '15:00', enabled: true },
  Friday: { from: '09:00', to: '17:00', enabled: true },
  Saturday: { from: '10:00', to: '14:00', enabled: true },
  Sunday: { from: '', to: '', enabled: false },
};

const MentorSchedules = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [availability, setAvailability] = useState(defaultAvailability);
  const [timezone] = useState('Asia/Kathmandu (GMT+5:45)');
  const navigate = useNavigate();

  const handleTabClick = (day) => {
    setSelectedDay(day);
  };

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Current Availability</h1>
      {/* Timezone and week tabs as before */}
      <div className="mb-6">
        <label className="block text-sm text-gray-600 mb-1">Timezone</label>
        <input
          type="text"
          value={timezone}
          disabled
          className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
        />
      </div>
      {/* Available Days section - title and edit button */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-700">Available Days:</span>
        <button
          onClick={() => navigate('/mentor/availability')}
          className="ml-4 px-4 py-2 rounded bg-[var(--primary-color)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors shadow"
        >
          Edit
        </button>
      </div>
      <div className="mb-6">
        <div className="flex space-x-2 mb-4">
          {daysOfWeek.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                selectedDay === day
                  ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)]'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              {day}
            </button>
          ))}
        </div>
        <div className="bg-gray-50 rounded-lg p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-medium text-gray-800">{selectedDay}</span>
          </div>
          {availability[selectedDay].enabled ? (
            <div className="flex items-center space-x-6 mt-2">
              <div>
                <span className="text-sm text-gray-600">From:</span>
                <span className="ml-2 text-gray-900 font-medium">{availability[selectedDay].from}</span>
              </div>
              <div>
                <span className="text-sm text-gray-600">To:</span>
                <span className="ml-2 text-gray-900 font-medium">{availability[selectedDay].to}</span>
              </div>
            </div>
          ) : (
            <div className="text-gray-400 italic">Unavailable</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorSchedules; 