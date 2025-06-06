import { useState } from "react";
import logoImage from '../assets/images/learno_logo.png';
import backgroundImage from '../assets/images/auth_bg.png';
import { FcGoogle } from "react-icons/fc";


const RegisterStep = ({ formData, handleChange, onStepComplete }) => {
  const { name, email, password, confirmPassword } = formData;
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateForm = (fields) => {
    const errors = {};

    const validateName = (value) => {
      const trimmed = value.trim();
      if (!trimmed) return "Full name is required.";
      if (trimmed.length < 2) return "Name must be at least 2 characters.";
      return null;
    };

    const validateEmail = (value) => {
      const trimmed = value.trim();
      if (!trimmed) return "Email address is required.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) return "Please enter a valid email address.";
      return null;
    };

    const validatePassword = (value) => {
      if (!value) return "Password is required.";
      if (value.length < 8) return "Password must be at least 8 characters long.";
      const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
      if (!strongPattern.test(value)) {
        return "Password must include uppercase, lowercase, number, and special character.";
      }
      return null;
    };

    const validateConfirmPassword = (confirmValue, originalValue) => {
      if (!confirmValue) return "Please confirm your password.";
      if (confirmValue !== originalValue) return "Passwords do not match.";
      return null;
    };

    errors.name = validateName(fields.name);
    errors.email = validateEmail(fields.email);
    errors.password = validatePassword(fields.password);
    errors.confirmPassword = validateConfirmPassword(fields.confirmPassword, fields.password);

    Object.keys(errors).forEach((key) => {
      if (!errors[key]) delete errors[key];
    });

    return {
      errors,
      isValid: Object.keys(errors).length === 0
    };
  };

  const handleSubmit = () => {
    const validationResults = validateForm({ name, email, password, confirmPassword });
    setErrors(validationResults.errors);
    setIsValid(validationResults.isValid);

    if (validationResults.isValid) {
      onStepComplete();
    }
  };

  return (

    <div 
      className="min-h-screen flex items-center justify-center p-6 bg-cover bg-center relative"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 opacity-80" style={{ backgroundColor: 'var(--primary-color)' }}></div>
      <div className="bg-white/90 backdrop-blur-sm p-8 rounded-xl shadow-xl w-full max-w-2xl relative z-10">
     {/* Logo */}
      <div className="flex justify-center mb-2 -mt-10">
        <img src={logoImage} alt="Logo" className="h-48 object-contain" />
      </div>
        <h3 className="text-2xl text-gray-700 mb-6 -mt-10 font-semibold text-center">Register</h3>
        <div className="grid grid-cols-1 gap-6">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-gray-700 font-medium text-left">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.name ? "border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:ring-[#26A69A]/10"
              }`}
              placeholder="Enter your name"
            />
            {errors.name && <div className="text-red-600 text-sm text-left">{errors.name}</div>}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-gray-700 font-medium text-left">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.email ? "border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:ring-[#26A69A]/10"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && <div className="text-red-600 text-sm text-left">{errors.email}</div>}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-gray-700 font-medium text-left">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.password ? "border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:ring-[#26A69A]/10"
              }`}
              placeholder="Enter password"
            />
            {errors.password && <div className="text-red-600 text-sm text-left">{errors.password}</div>}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-gray-700 font-medium text-left">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.confirmPassword ? "border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:ring-[#26A69A]/10"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && <div className="text-red-600 text-sm text-left">{errors.confirmPassword}</div>}
          </div>

          {/* Terms */}
          <p className="text-gray-700 text-base font-medium text-left">
            By creating an account, you agree to our{" "}
            <a href="/terms" className="text-[#26A69A] font-medium hover:underline">Terms</a> and acknowledge the{" "}
            <a href="/privacy" className="text-[#26A69A] font-medium hover:underline">Privacy Statement</a>.
          </p>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${
              isValid ? "bg-[#26A69A] hover:bg-[#208f84]" : "bg-[#26A69A]"
            }`}
          >
            Next
          </button>
          <div className="flex items-center my-2">
            <hr className="flex-grow border-gray-300" />
            <span className="mx-3 text-gray-500 font-medium">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>
          
          <button
            type="button"
            className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-100 transition duration-300 shadow-sm"
   onClick={() => alert("Google sign up clicked")} // replace with your Google sign up logic
          ><FcGoogle size={22} />

            Sign up with Google
          </button>
<p className="text-center text-gray-700 text-base font-medium">
          Already have an account?{" "}
          <a
            href="/login"
            className="font-medium hover:underline"
            style={{ color: "var(--primary-color)" }}
          >
            Login
          </a>
        </p>

        </div>
      </div>
    </div>
  );
};

export default RegisterStep;
