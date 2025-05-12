import { useState, useEffect } from "react"

const AdditionalInfoMentorStep = ({ formData, handleChange }) => {
  const { bio, phoneNumber, sessionPrice } = formData
  const [errors, setErrors] = useState({})

  useEffect(() => {
    const newErrors = {}
    if (!phoneNumber.trim()) newErrors.phoneNumber = "Phone Number is required"
    else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(phoneNumber.trim())) newErrors.phoneNumber = "Invalid phone number format"
    if (!sessionPrice.trim()) newErrors.sessionPrice = "Session Price is required"
    else if (isNaN(sessionPrice) || parseFloat(sessionPrice) <= 0) newErrors.sessionPrice = "Session Price must be a positive number"
    setErrors(newErrors)
  }, [phoneNumber, sessionPrice])

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Additional Information</h3>
      <div className="grid grid-cols-2 gap-8 mb-7">
        <div className="flex flex-col gap-2 col-span-2">
          <label htmlFor="bio" className="flex items-center text-gray-700 text-base font-medium">Bio</label>
          <textarea
            id="bio"
            name="bio"
            value={bio}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 resize-y min-h-[120px]"
            placeholder="Enter your short description"
            rows="4"
          ></textarea>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="flex items-center text-gray-700 text-base font-medium">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.phoneNumber ? "border-red-600 focus:border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#26A69A] focus:ring-[#26A69A]/10"}`}
            placeholder="Enter contact number"
          />
          {errors.phoneNumber && <div className="text-red-600 text-sm font-medium text-left">{errors.phoneNumber}</div>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="sessionPrice" className="flex items-center text-gray-700 text-base font-medium">Session Price</label>
          <input
            type="text"
            id="sessionPrice"
            name="sessionPrice"
            value={sessionPrice}
            onChange={handleChange}
            className={`w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:ring-2 transition-all duration-300 ${errors.sessionPrice ? "border-red-600 focus:border-red-600 focus:ring-red-600/10" : "border-gray-300 focus:border-[#26A69A] focus:ring-[#26A69A]/10"}`}
            placeholder="Enter session price per hour"
          />
          {errors.sessionPrice && <div className="text-red-600 text-sm font-medium text-left">{errors.sessionPrice}</div>}
        </div>
      </div>
    </>
  )
}

export default AdditionalInfoMentorStep