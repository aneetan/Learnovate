import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const BookingRequest = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};
  const [formData, setFormData] = useState({
    mentorshipTopic: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.mentorshipTopic.trim()) {
      newErrors.mentorshipTopic = 'Mentorship topic is required';
    }
     if (!formData.notes.trim()) {
      newErrors.mentorshipTopic = 'Explain why you need this mentorship';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      // Here you would typically send data to your backend
      console.log('Submitting:', {
        date: selectedDate,
        time: selectedTime,
        ...formData
      });
      // Simulate API call
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Booking request submitted successfully!');
      }, 1500);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">Complete Your Booking</h1>
        <p className="text-gray-600">Fill in the details to confirm your mentorship session</p>
      </div>
      
      <div className="mb-8 p-4 bg-blue-50 rounded-lg border border-blue-100">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">Selected Appointment</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-gray-700">{selectedDate?.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          </div>
          <div className="flex items-center">
            <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-gray-700">{selectedTime}</span>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="mentorshipTopic" className="block text-sm font-medium text-gray-700 mb-1">
            What do you need mentorship on? <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="mentorshipTopic"
            name="mentorshipTopic"
            value={formData.mentorshipTopic}
            onChange={handleChange}
            placeholder="E.g. HSEB scholarship, career guidance, etc."
            className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200 ${
              errors.mentorshipTopic ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.mentorshipTopic && (
            <p className="mt-1 text-sm text-red-600">{errors.mentorshipTopic}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            Additional Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            rows="4"
            className="w-full resize-none px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-200"
            placeholder="Any specific questions or topics you'd like to focus on..."
          ></textarea>
        </div>
        
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              isSubmitting ? 'opacity-75 cursor-not-allowed' : ''
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (
              'Confirm Booking'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingRequest;