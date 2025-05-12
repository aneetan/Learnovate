import axios from "axios";
import { useState } from "react";

const SelectRoleStep = ({ formData, handleChange, onSubmit }) => {
  const { role } = formData;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleFormSubmit = async () => {
    if (!role) {
      setSubmitError("Please select a role");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Replace with your actual API endpoint
      const response = await axios.post('http://localhost:3000/users', formData);
      
      // Handle successful registration
      console.log('Registration successful', response.data);
      onSubmit(response.data); 
    } catch (error) {
      console.error('Registration failed', error);
      setSubmitError(error.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Select Your Role</h3>
      <div className="grid grid-cols-1 max-w-[300px] mx-auto min-h-[120px] gap-8 mb-7 md:max-w-full md:min-h-[100px]">
        <div className="flex flex-col gap-4">
          <label htmlFor="role" className="flex items-center text-gray-700 text-base font-medium">
            I want to be a:
          </label>
          <div className="relative w-full">
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8" 
            >
              <option value="">Select a role</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
          {submitError && <div className="text-red-600 text-sm font-medium text-left">{submitError}</div>}
        </div>
      </div>
      <button 
        onClick={handleFormSubmit} 
        disabled={!role || isSubmitting}
        className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${
          role && !isSubmitting 
            ? "bg-[#26A69A] hover:bg-[#208f84]" 
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Registration'}
      </button>
    </>
  );
};

export default SelectRoleStep