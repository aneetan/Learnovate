import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL, formatTimeTo12Hour } from '../../config/config';

const MentorSchedules = (mentorId) => {
  const [selectedDay, setSelectedDay] = useState('');
  const [availability, setAvailability] = useState({});
  const [timezone, setTimezone] = useState('Asia/Kathmandu (GMT+5:45)');
  const [loading, setLoading] = useState(true);
  const [daysOfWeek, setDaysOfWeek] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMentorAvailability = async () => {
      try {
        const response = await axios.get(`${API_URL}/mentor/getAvailability/9`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        const data = response.data;
        setAvailability(data);
        
        // Set initial selected day to first available day if days exist
        if (data.days && data.days.length > 0) {
          setSelectedDay(data.days[0]);
        }
      } catch (error) {
        console.error('Error fetching availability:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMentorAvailability();
  }, []);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-center items-center h-32">
          <p>Loading availability...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto mt-12 bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-between">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Current Availability</h1>
        <button
          onClick={() => navigate('/mentor/availability')}
          className="px-4 py-2 rounded bg-[var(--primary-color)] text-white text-sm font-medium hover:bg-[var(--primary-dark)] transition-colors shadow"
        >
          Edit Availability
        </button>
      </div>

      
      {/* Timezone Display */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-1">Timezone</label>
        <input
          type="text"
          value={timezone}
          disabled
          className="w-full border border-gray-200 rounded-lg px-3 py-2 bg-gray-100 text-gray-700 cursor-not-allowed"
        />
      </div>

      <div className="mb-6">
        <span className="font-medium text-gray-700">Selected Days:</span>

        {/* Day Selection Tabs */}
        <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
          {availability.days.map((day) => (
            <button
              key={day}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border flex-shrink-0
                bg-gray-200 text-gray-700 border-gray-200 hover:bg-gray-400"
            >
              {day}
            </button>
          ))}
        </div>

        {/* Availability Display */}
          <div className="flex items-center justify-between mb-2">
            Time Selected: 
          </div>
          
          <div className="mt-4 space-y-3">
            <span className="text-sm text-gray-600 w-20">From:</span>
              <span className="ml-2 text-gray-900 font-medium px-3 py-2 rounded border-none w-full">
                {formatTimeTo12Hour(availability.startTime)}
              </span>

               <span className="text-sm text-gray-600 w-20">To:</span>
              <span className="ml-2 text-gray-900 font-medium px-3 py-2 rounded  w-full">
                {formatTimeTo12Hour(availability.endTime)}
              </span> 
          </div>
        </div>
      </div>
  );
};

export default MentorSchedules;