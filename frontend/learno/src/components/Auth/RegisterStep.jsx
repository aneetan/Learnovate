import { useEffect, useState } from "react"

const RegisterStep = ({ formData, handleChange, onStepComplete }) => {
  const { name, email, password, confirmPassword } = formData
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(false)

  useEffect(() => {
    const newErrors = {}
    if (!name.trim()) newErrors.name = "Name is required"
    else if (name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format"
    if (!password) newErrors.password = "Password is required"
    else if (password.length < 8) newErrors.password = "Password must be at least 8 characters"
    if (!confirmPassword) newErrors.confirmPassword = "Confirm Password is required"
    else if (confirmPassword !== password) newErrors.confirmPassword = "Passwords do not match"
    
    setErrors(newErrors)
    setIsValid(Object.keys(newErrors).length === 0)
  }, [name, email, password, confirmPassword])

  const handleSubmit = () => {
    if (isValid) {
      onStepComplete()
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-8 mb-7">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="flex items-center text-gray-700 text-base font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.name ? "border-red-600 focus:border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#26A69A] focus:ring-[#26A69A]/10"}`}
            placeholder="Enter your name"
          />
          {errors.name && <div className="text-red-600 text-sm font-medium text-left">{errors.name}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="flex items-center text-gray-700 text-base font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.email ? "border-red-600 focus:border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#26A69A] focus:ring-[#26A69A]/10"}`}
            placeholder="Enter your email"
          />
          {errors.email && <div className="text-red-600 text-sm font-medium text-left">{errors.email}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="password" className="flex items-center text-gray-700 text-base font-medium">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.password ? "border-red-600 focus:border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#26A69A] focus:ring-[#26A69A]/10"}`}
            placeholder="Enter password"
          />
          {errors.password && <div className="text-red-600 text-sm font-medium text-left">{errors.password}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="confirmPassword" className="flex items-center text-gray-700 text-base font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.confirmPassword ? "border-red-600 focus:border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#26A69A] focus:ring-[#26A69A]/10"}`}
            placeholder="Confirm your password"
          />
          {errors.confirmPassword && <div className="text-red-600 text-sm font-medium text-left">{errors.confirmPassword}</div>}
        </div>
        <button 
          onClick={handleSubmit} 
          disabled={!isValid}
          className={`w-full p-3 rounded-lg text-white font-semibold transition-all duration-300 ${
            isValid 
              ? "bg-[#26A69A] hover:bg-[#208f84]" 
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Next
        </button>
      </div>
    </>
  )
}

export default RegisterStep