import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";  // Fixed import here
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import logoImage from "../assets/images/learno_logo.png";
import backgroundImage from "../assets/images/auth_bg.png";
import { login } from "../features/userSlice";
import GoogleLoginButton from "../components/GoogleLoginButton";
import axios from "axios";
import { API_URL, getUserId } from "../config/config";

const Login = ({ setCurrentUser, users }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mentor, setMentor] = useState(null);
  const [isAuthenticate, setIsAuthenticated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);  // New state for password visibility

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    let data = {};
    try {
      data = await response.json();
      localStorage.setItem("token", data.token);
    } catch {
      const text = await response.text();
      throw new Error(text || "Login failed");
    }

    if (!response.ok) {
      setError(data.error || "Invalid email or password");
      setIsAuthenticated(false);
      return;
    }

    if (data.user && data.token) {
      dispatch(login(data.user));
      setIsAuthenticated(true);

      const decoded = jwtDecode(data.token);
      const role = decoded.role?.toUpperCase();
      const userId = getUserId(data.token);

      // Only fetch mentor data if user is a mentor
      if (role === "MENTOR") {
        try {
          const mentorResponse = await axios.get(`${API_URL}/auth/getMentor/${userId}`);
          const mentorData = mentorResponse.data;
          
          if (data.user.isDetailsFilled) {
            if (!mentorData) {
              navigate("/mentor/registerDetails");
              return;
            }
            
            switch (mentorData.status) {
              case "declined":
                navigate("/mentor/declination");
                break;
              case "pending":
                navigate("/mentor/confirmation");
                break;
              case "approved":
                navigate("/mentor/dashboard");
                break;
              default:
                navigate("/mentor/registerDetails");
            }
          } else {
            navigate("/mentor/registerDetails");
          }
          return;
        } catch (err) {
          console.error("Error fetching mentor data:", err.message);
          // If mentor fetch fails, still proceed to register details
          navigate("/mentor/registerDetails");
          return;
        }
      }

      // Handle other roles
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "MENTEE") {
        navigate(data.user.isDetailsFilled ? "/mentee/dashboard" : "/mentee/registerDetails");
      } else {
        setError("Invalid role");
      }
    } else {
      setError(data.error || "Login failed");
      setIsAuthenticated(false);
    }
  } catch (err) {
    setError(err.message || "Invalid email or password");
    setIsAuthenticated(false);
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
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl p-10 w-full max-w-[550px] border border-gray-200 relative z-10 flex flex-col justify-center min-h-[70vh]">
        {/* Logo */}
        <div className="flex justify-center mb-2 -mt-15">
          <img src={logoImage} alt="Logo" className="h-44 object-contain" />
        </div>

        <h2 className="text-center -mt-10 mb-8 text-gray-900 font-bold text-2xl relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded-lg">
          Login to Learnovate
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <div className="text-red-600 text-sm mb-4">{error}</div>}
          <div className="grid grid-cols-1 gap-8 mb-7">
            <div className="flex flex-col gap-4">
              <label
                htmlFor="email"
                className="text-gray-700 text-base font-medium text-left"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
                required
              />
            </div>

            <div className="flex flex-col gap-4 relative">
              <div className="flex justify-between items-center">
                <label
                  htmlFor="password"
                  className="text-gray-700 text-base font-medium text-left"
                >
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-[#26A69A] text-sm font-medium hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full p-3 pr-12 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
                required
              />
              <div
                className="absolute right-4 top-[55px] cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="bg-[var(--primary-color)] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[var(--primary-dark)] hover:-translate-y-1 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="flex items-center mt-8 mb-4 ">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-3 text-gray-500 font-medium">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        {/* Google Signup */}
          <GoogleLoginButton/>

        <div className="mt-8 text-center border-t border-gray-200 text-gray-500 text-sm">
          <p>
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-[#26A69A] font-medium hover:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
