import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import logoImage from "../assets/images/learno_logo.png";
import backgroundImage from "../assets/images/auth_bg.png";
import { login } from "../features/userSlice";

const Login = ({ setCurrentUser, users }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticate, setIsAuthenticated] = useState(false);

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
      const response = await fetch("http://localhost:8080/api/auth/login", {
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
        // Save userInfo to Redux
        dispatch(login(data.user));
        setIsAuthenticated(true);

        const decoded = jwtDecode(data.token);
        const role = decoded.role?.toUpperCase();
        localStorage.setItem("token", data.token);

        if (role === "ADMIN") {
          navigate("/admin/dashboard");
        } else if (role === "MENTOR") {
          navigate("/mentor/dashboard");
        } else if (role === "MENTEE") {
          navigate("/mentee/dashboard");
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
    <div className="absolute inset-0 opacity-80" style={{ backgroundColor: 'var(--primary-color)' }}></div>
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
              <label htmlFor="email" className="text-gray-700 text-base font-medium text-left">Email</label>
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
            <div className="flex flex-col gap-4">
              <label htmlFor="password" className="text-gray-700 text-base font-medium text-left">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#26A69A] text-white px-6 py-3 rounded-lg font-medium cursor-pointer hover:bg-[#20897f] hover:-translate-y-1 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed w-full"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-8 text-center pt-6 border-t border-gray-200 text-gray-500 text-sm">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-[#26A69A] font-medium hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
