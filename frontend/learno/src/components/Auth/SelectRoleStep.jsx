import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImage from "../../assets/images/learno_logo.png";
import backgroundImage from "../../assets/images/auth_bg.png";

const SelectRoleStep = ({ formData, handleChange, onSubmit }) => {
  const navigate = useNavigate();
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
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          role: role
        })
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 409) {
          throw new Error(data.error || 'Email already in use');
        }
        throw new Error(data.message || 'Registration failed');
      }

      onSubmit(data);
      navigate(data.redirectUrl || "/login");

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 opacity-80" style={{ backgroundColor: 'var(--primary-color)' }}></div>

      {/* Form Container */}
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-lg relative z-10">
       {/* Logo */}
            <div className="flex justify-center mb-2 -mt-10">
              <img src={logoImage} alt="Logo" className="h-48 object-contain" />
            </div>
        <h3 className="text-2xl text-gray-700 mb-6 -mt-10 font-semibold text-center">Select Your Role</h3>

        <div className="flex flex-col gap-4 mb-7">
          <label htmlFor="role" className="text-gray-700 font-medium text-left">
            I want to be a:
          </label>

          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
              submitError ? "border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:ring-[#26A69A]/10"
            }`}
          >
            <option value="" disabled>
              Select a role
            </option>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>


          {submitError && (
            <div className="text-red-600 text-sm text-left">{submitError}</div>
          )}
        </div>

        <button
          onClick={handleFormSubmit}
          disabled={!role || isSubmitting}
          className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            role && !isSubmitting ? "bg-[#26A69A] hover:bg-[#208f84]" : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
      </div>
    </div>
  );
};

export default SelectRoleStep;
