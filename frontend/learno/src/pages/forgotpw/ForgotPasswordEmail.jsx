import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa";
import logoImage from "../../assets/images/learno_logo.png";
import backgroundImage from "../../assets/images/auth_bg.png";
import Preloader from "../../components/common/Preloader";
import axios from "axios";
import { API_URL} from "../../config/config";

const ForgotPasswordEmail = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address.");
      setLoading(false);
      return;
    }

    try {
      // Call your backend API endpoint
      const response = await axios.post(`${API_URL}/auth/forgot-password`, { email });
      
      if (response.data.success) {
        setSuccess("OTP has been sent to your email address");
        // Navigate to OTP page after a short delay to show success message
        setTimeout(() => {
          navigate("/forgot-password-otp", { state: { email } });
        }, 1500);
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (err) {
      // Handle different types of errors
      if (err.response) {
        // The request was made and the server responded with a status code
        if (err.response.status === 404) {
          setError("Email not found. Please check your email address.");
        } else if (err.response.status === 429) {
          setError("Too many requests. Please try again later.");
        } else {
          setError(err.response.data.message || "An error occurred");
        }
      } else if (err.request) {
        // The request was made but no response was received
        setError("Network error. Please check your connection.");
      } else {
        // Something happened in setting up the request
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="flex justify-center items-center p-6 min-h-screen bg-cover bg-center relative font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: "var(--primary-color)" }}
      ></div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-10 w-full max-w-[550px] border border-gray-200 relative z-10 flex flex-col justify-center min-h-[50vh] mx-auto">
        {/* Preloader Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 flex items-center justify-center z-20 rounded-xl">
            <Preloader size="large" text="Please wait..." />
          </div>
        )}
        
        {/* Logo */}
        <div className="flex justify-center mb-2 -mt-15">
          <img src={logoImage} alt="Logo" className="h-44 object-contain" />
        </div>

        <h2 className="text-center -mt-10 mb-8 text-gray-900 font-bold text-2xl relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded-lg">
          Forgot Password
        </h2>
        
        <p className="text-center text-gray-600 mb-8 -mt-4">
          Enter your email to receive a one-time code.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && (
            <div className="text-red-600 text-sm mb-4 text-center">
              {error}
            </div>
          )}
          
          {success && (
            <div className="text-green-600 text-sm mb-4 text-center">
              {success}
            </div>
          )}
          
          <div className="flex flex-col gap-4 mb-7">
            <label htmlFor="email" className="text-gray-700 text-base font-medium text-left">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 pl-10 pr-4 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
                placeholder="Enter your email address"
                required
                disabled={loading}
              />
            </div>
          </div>
          
          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[var(--primary-dark)] hover:-translate-y-1 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed w-full"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send Code"}
          </button>
        </form>
        
        <div className="mt-8 text-center border-t border-gray-200 text-gray-500 text-sm pt-4">
          <span>Remember your password? </span>
          <Link
            to="/login"
            className="text-[#26A69A] font-medium hover:underline"
          >
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordEmail;