import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaLock, FaEye, FaEyeSlash, FaCheckCircle } from "react-icons/fa";
import logoImage from "../../assets/images/learno_logo.png";
import backgroundImage from "../../assets/images/auth_bg.png";


const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const tokenParam = searchParams.get("token");
    // For demo purposes, accept any token or no token
    if (tokenParam) {
      setToken(tokenParam);
    } else {
      setToken("demo-token");
    }
  }, [searchParams]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    const strongPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])/;
    if (!strongPattern.test(password)) {
      return "Password must include uppercase, lowercase, number, and special character.";
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validate password
    const passwordError = validatePassword(formData.password);
    if (passwordError) {
      setError(passwordError);
      setLoading(false);
      return;
    }

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      setLoading(false);
      return;
    }

    // Simulate API call delay
    setTimeout(() => {
      // For demo purposes, always succeed
      setSuccess(true);
      setLoading(false);
    }, 1500);
  };

  const handleBackToLogin = () => {
    navigate("/login");
  };

  if (success) {
    return (
      <div
        className="flex justify-center items-center p-6 min-h-screen bg-cover bg-center relative font-sans"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <div
          className="absolute inset-0 opacity-80"
          style={{ backgroundColor: "var(--primary-color)" }}
        ></div>
        
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-10 w-full max-w-[550px] border border-gray-200 relative z-10 flex flex-col justify-center min-h-[70vh]">
          {/* Logo */}
          <div className="flex justify-center mb-2 -mt-15">
            <img src={logoImage} alt="Logo" className="h-44 object-contain" />
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-6">
              <FaCheckCircle className="text-green-500 text-6xl" />
            </div>
            
            <h2 className="text-center mb-4 text-gray-900 font-bold text-2xl relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded-lg">
              Password Reset Successfully
            </h2>

            <p className="text-gray-600 mb-8">
              Your password has been successfully reset. You can now log in with your new password.
            </p>

            <button
              onClick={handleBackToLogin}
              className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[var(--primary-dark)] hover:-translate-y-1 transition-all duration-200 w-full"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex justify-center items-center p-6 min-h-screen bg-cover bg-center relative font-sans"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div
        className="absolute inset-0 opacity-80"
        style={{ backgroundColor: "var(--primary-color)" }}
      ></div>
      
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-10 w-full max-w-[550px] border border-gray-200 relative z-10 flex flex-col justify-center min-h-[70vh]">
        {/* Logo */}
        <div className="flex justify-center mb-2 -mt-15">
          <img src={logoImage} alt="Logo" className="h-44 object-contain" />
        </div>

        <h2 className="text-center -mt-10 mb-8 text-gray-900 font-bold text-2xl relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded-lg">
          Reset Your Password
        </h2>

        <p className="text-center text-gray-600 mb-8 -mt-4">
          Enter your new password below.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          
          <div className="grid grid-cols-1 gap-6 mb-7">
            <div className="flex flex-col gap-4 relative">
              <label
                htmlFor="password"
                className="text-gray-700 text-base font-medium text-left"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 pr-12 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
                  placeholder="Enter new password"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4 relative">
              <label
                htmlFor="confirmPassword"
                className="text-gray-700 text-base font-medium text-left"
              >
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 pl-12 pr-12 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
                  placeholder="Confirm new password"
                  required
                />
                <FaLock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <div
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                </div>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[var(--primary-dark)] hover:-translate-y-1 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed w-full"
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>


      </div>
    </div>
  );
};

export default ResetPassword; 