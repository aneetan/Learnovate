import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode";

const Login = ({setCurrentUser, users }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [isAuthenticate, setIsAuthenticated] = useState(false)

  const navigate = useNavigate()

  const { email, password } = formData

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true)
    setError("")
    
    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        credentials: 'include', 
        headers: {
          "Content-Type": "application/json",
        },
          body: JSON.stringify(formData),
      })

      let data = {};
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      throw new Error(text || "Login failed");
    }

    if (!response.ok) {
      setError(data.error || "Invalid email or password");
    }

    if (data.user && data.token) {
      setIsAuthenticated(true);

      const decoded = jwtDecode(data.token);
      const role = decoded.role?.toUpperCase();
      localStorage.setItem("token", data.token);

      // Redirect based on role
      if (role === "ADMIN") {
        navigate("/admin/dashboard");
      } else if (role === "MENTOR") {
        navigate("/mentor/dashboard");
      } else if (role === "MENTEE") {
        navigate("/mentee/dashboard");
      } else {
        return setError("Invalid role");
      }
      
    } else {
      setError(data.error || "Login failed");
      setIsAuthenticated(false);
    }

    } catch (err) {
      setError(err.message || "Invalid email or password")
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center p-6 min-h-[100vh] bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80')] bg-no-repeat bg-center bg-cover bg-[#26A69A] bg-blend-overlay font-sans relative">
      <div className="before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[#26A69A] before:opacity-80 before:z-[-1] after:absolute after:top-0 after:left-0 after:right-0 after:bottom-0 after:bg-[url('https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1350&q=80')] after:bg-no-repeat after:bg-center after:bg-cover after:opacity-20 after:z-[-2]"></div>
      <div className="bg-white rounded-lg shadow-md p-10 w-full max-w-[850px] border border-gray-200 transition-all duration-300 relative z-10 flex flex-col justify-center min-h-[70vh]">
        <h2 className="text-center mb-8 text-gray-900 font-bold text-2xl relative after:content-[''] after:absolute after:bottom-[-8px] after:left-1/2 after:transform after:-translate-x-1/2 after:w-12 after:h-1 after:bg-[#26A69A] after:rounded-lg">Login to Learnovate</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && (
          <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>
        )}
          <div className="grid grid-cols-1 gap-8 mb-7">
            <div className="flex flex-col gap-4">
              <label htmlFor="email" className="flex items-center text-gray-700 text-base font-medium">Email</label>
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
              <label htmlFor="password" className="flex items-center text-gray-700 text-base font-medium">Password</label>
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
            Don't have an account? <Link to="/register" className="text-[#26A69A] font-medium hover:underline">Register</Link>
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl text-gray-700 mb-4 font-semibold">Demo Accounts</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <strong className="font-medium">Mentor:</strong> john@example.com / password123
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <strong className="font-medium">Apprentice:</strong> mike@example.com / password123
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <p className="text-gray-700">
                <strong className="font-medium">Admin:</strong> admin@example.com / admin123
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login