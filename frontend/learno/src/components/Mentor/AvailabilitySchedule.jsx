import React, { useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import { API_URL, getUserId } from "../../config";
import { useNavigate } from "react-router-dom";

const timezones = [
  { value: "Asia/Kathmandu", label: "Kathmandu (GMT+5:45)" },
  // Add other timezones here if needed
];

const daysOfWeek = [
  { value: "Monday", label: "Monday" },
  { value: "Tuesday", label: "Tuesday" },
  { value: "Wednesday", label: "Wednesday" },
  { value: "Thursday", label: "Thursday" },
  { value: "Friday", label: "Friday" },
  { value: "Saturday", label: "Saturday" },
  { value: "Sunday", label: "Sunday" },
];

export default function AvailabilitySchedule() {
  const [selectedTimezone, setSelectedTimezone] = useState(timezones[0]);
  const [selectedDays, setSelectedDays] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [timeRange, setTimeRange] = useState({ start: "09:00", end: "17:00" });
  const navigate = useNavigate();

  const handleDayCheckbox = (dayValue) => {
    setSelectedDays((prev) =>
      prev.includes(dayValue)
        ? prev.filter((d) => d !== dayValue)
        : [...prev, dayValue]
    );
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setSubmitting(true);

  const formData = {
    days: selectedDays,
    startTime: timeRange.start,
    endTime: timeRange.end,
    userId: getUserId(localStorage.getItem("token"))
  };

  try {
    const response = await fetch(`${API_URL}/mentor/setAvailability`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify(formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to save availability');
    }

    const data = await response.json();
    navigate("/mentor/dashboard");
  } catch (err) {
    console.error("Error submitting availability:", err);
    alert(err.message || "Failed to save availability. Please try again.");
  } finally {
    setSubmitting(false);
  }
};

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <form 
        onSubmit={handleSubmit} 
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6"
      > 
        <h2 className="text-2xl font-bold text-gray-800">Set Your Availability</h2>
        <span className="text-gray-600 text-sm font-normal"> Each session will be of one hour by default.</span>
       
        
        {/* Timezone Section */}
        <div className="my-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Time Zone</label>
          <Select
            options={timezones}
            value={selectedTimezone}
            onChange={tz => setSelectedTimezone(tz)}
            isSearchable
            isDisabled
            className="basic-single"
            classNamePrefix="select"
            styles={{
              control: (base) => ({
                ...base,
                borderColor: '#d1d5db',
                '&:hover': {
                  borderColor: '#9ca3af'
                }
              })
            }}
          />
          <p className="mt-1 text-sm text-gray-500">Timezone is set to Kathmandu (GMT+5:45)</p>
        </div>

        {/* Days Selection Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Available Days</label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {daysOfWeek.map((day) => (
              <label 
                key={day.value} 
                className={`inline-flex items-center p-3 rounded-md border cursor-pointer transition-colors ${
                  selectedDays.includes(day.value) 
                    ? 'bg-blue-50 border-blue-300' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                  checked={selectedDays.includes(day.value)}
                  onChange={() => handleDayCheckbox(day.value)}
                />
                <span className="ml-2 text-sm text-gray-700">{day.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Time Range Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time Range (applies to all selected days)
          </label>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">From</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={timeRange.start}
                onChange={e => setTimeRange({ ...timeRange, start: e.target.value })}
                required
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-gray-500 mb-1">To</label>
              <input
                type="time"
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                value={timeRange.end}
                onChange={e => setTimeRange({ ...timeRange, end: e.target.value })}
                required
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={submitting || selectedDays.length === 0}
          className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
            submitting || selectedDays.length === 0
              ? 'bg-blue-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {submitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : 'Save Availability'}
        </button>
      </form>
    </div>
  );
}