const RegisterStep = ({ formData, handleChange }) => {
  const { name, email, password, confirmPassword } = formData

  return (
    <>
      <div className="grid grid-cols-1 gap-8 mb-7">
        <div className="flex flex-col gap-4">
          <label htmlFor="name" className="flex items-center text-gray-700 text-base font-medium">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
            placeholder="Enter your name"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="email" className="flex items-center text-gray-700 text-base font-medium">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
            placeholder="Enter your email"
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
            placeholder="Enter password"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="confirmPassword" className="flex items-center text-gray-700 text-base font-medium">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
            placeholder="Confirm your password"
          />
        </div>
      </div>
    </>
  )
}

export default RegisterStep