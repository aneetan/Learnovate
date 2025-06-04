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
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      console.log('Submitting:', {
        date: selectedDate,
        time: selectedTime,
        ...formData
      });
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Booking request submitted successfully!');
      }, 1500);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundColor: 'var(--gray-50)',
        fontFamily: 'var(--font-sans)'
      }}
    >
      <div
        className="w-full max-w-md p-6"
        style={{
          backgroundColor: 'white',
          borderRadius: 'var(--radius-lg)',
          boxShadow: 'var(--shadow-md)'
        }}
      >
        <div className="text-center mb-8">
          <h1
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--gray-800)' }}
          >
            Complete Your Booking
          </h1>
          <p style={{ color: 'var(--gray-600)' }}>
            Fill in the details to confirm your mentorship session
          </p>
        </div>

        <div
          className="mb-8 p-4 border"
          style={{
            backgroundColor: 'var(--primary-lightest)',
            borderColor: 'var(--primary-lighter)',
            borderRadius: 'var(--radius)',
          }}
        >
          <h2
            className="text-lg font-semibold mb-2"
            style={{ color: 'var(--primary-dark)' }}
          >
            Selected Appointment
          </h2>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center text-gray-700">
              📅{' '}
              <span className="ml-2">
                {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center text-gray-700">
              🕒 <span className="ml-2">{selectedTime}</span>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="mentorshipTopic" className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-700)' }}>
              What do you need mentorship on? <span style={{ color: 'red' }}>*</span>
            </label>
            <input
              type="text"
              id="mentorshipTopic"
              name="mentorshipTopic"
              value={formData.mentorshipTopic}
              onChange={handleChange}
              placeholder="E.g. HSEB scholarship, career guidance, etc."
              className="w-full px-4 py-2 transition duration-200 outline-none"
              style={{
                border: `1px solid ${errors.mentorshipTopic ? 'red' : 'var(--gray-300)'}`,
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-sans)',
                backgroundColor: 'white',
                color: 'var(--gray-800)',
                boxShadow: errors.mentorshipTopic ? '0 0 0 2px rgba(255,0,0,0.1)' : 'none'
              }}
            />
            {errors.mentorshipTopic && (
              <p className="mt-1 text-sm" style={{ color: 'red' }}>{errors.mentorshipTopic}</p>
            )}
          </div>

          <div>
            <label htmlFor="notes" className="block text-sm font-medium mb-1" style={{ color: 'var(--gray-700)' }}>
              Additional Notes (Optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 resize-none outline-none transition duration-200"
              style={{
                border: '1px solid var(--gray-300)',
                borderRadius: 'var(--radius)',
                fontFamily: 'var(--font-sans)',
                color: 'var(--gray-800)'
              }}
              placeholder="Any specific questions or topics you'd like to focus on..."
            ></textarea>
          </div>

          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 px-4 font-medium transition duration-200 focus:outline-none"
              style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                borderRadius: 'var(--radius)',
                opacity: isSubmitting ? 0.75 : 1,
                cursor: isSubmitting ? 'not-allowed' : 'pointer'
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
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
    </div>
  );
};

export default BookingRequest;
