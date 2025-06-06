import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const BookingRequest = () => {
  const location = useLocation();
  const { selectedDate, selectedTime } = location.state || {};

  function formatBookingDate(dateInput, dayOffset = 0) {
    // Parse input (works with Date object or date string)
    const date = new Date(dateInput);

    // Adjust day if offset is provided (e.g., +6 to change 06 to 12)
    if (dayOffset) {
      date.setDate(date.getDate() + dayOffset);
    }

    // Format as YYYY-MM-DD
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    return `"bookingDate": "${year}-${month}-${day}"`;
  }

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
      setErrors(prev => ({ ...prev, [name]: null }));
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
      console.log('Submitting:', {
        date: formatBookingDate(selectedDate),
        time: selectedTime,
        paymentStatus: "pending",
        ...formData
      });
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Booking request submitted successfully!');
      }, 1500);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--gray-50)] px-4 font-sans">
      <div className="w-full max-w-xl bg-white p-8 rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)]">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--gray-800)] mb-2">
            Complete Your Booking
          </h1>
          <p className="text-[var(--gray-600)]">
            Fill in the details to confirm your mentorship session.
          </p>
        </div>

        {/* Selected Date & Time */}
        <div className="bg-[var(--primary-lightest)] border border-[var(--primary-lighter)] p-4 rounded-[var(--radius)] mb-8">
          <h2 className="text-lg font-semibold text-[var(--primary-dark)] mb-2">
            Selected Appointment
          </h2>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-700">
            <div className="flex items-center">
              📅
              <span className="ml-2">
                {selectedDate?.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <div className="flex items-center">
              🕒 <span className="ml-2">{selectedTime}</span>
            </div>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Mentorship Topic */}
          <div>
            <label
              htmlFor="mentorshipTopic"
              className="block text-sm font-medium text-[var(--gray-700)] mb-1"
            >
              What do you need mentorship on? <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="mentorshipTopic"
              name="mentorshipTopic"
              value={formData.mentorshipTopic}
              onChange={handleChange}
              placeholder="E.g. Scholarships, career advice, etc."
              className={`w-full px-4 py-2 rounded-[var(--radius)] outline-none transition duration-200 border ${
                errors.mentorshipTopic
                  ? 'border-red-500 ring-1 ring-red-300'
                  : 'border-[var(--gray-300)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] focus:ring-1'
              }`}
            />
            {errors.mentorshipTopic && (
              <p className="text-sm text-red-500 mt-1">{errors.mentorshipTopic}</p>
            )}
          </div>

          {/* Notes */}
          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-[var(--gray-700)] mb-1"
            >
              Additional Notes (optional)
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              rows="4"
              placeholder="Any questions or topics you'd like to discuss..."
              className="w-full px-4 py-2 resize-none rounded-[var(--radius)] outline-none transition duration-200 border border-[var(--gray-300)] focus:border-[var(--primary-color)] focus:ring-[var(--primary-color)] focus:ring-1"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 rounded-[var(--radius)] font-medium text-white text-base transition-all duration-200 flex items-center justify-center ${
                isSubmitting
                  ? 'bg-[var(--primary-color)] opacity-75 cursor-not-allowed'
                  : 'bg-[var(--primary-color)] hover:bg-[var(--primary-dark)]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4zm2 5.29A7.96 7.96 0 014 12H0c0 3.04 1.13 5.82 3 7.94l3-2.65z"
                    />
                  </svg>
                  Processing...
                </>
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
