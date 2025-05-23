import { useState, useEffect } from "react"

const MenteeProfileStep = ({ formData, handleChange }) => {
  const { phoneNumber, currentStatus, interestArea } = formData
  const [digitCount, setDigitCount] = useState(0)

  const handlePhoneKeyPress = (e) => {
    const allowedChars = /[0-9\s\-\(\)]/
    if (!allowedChars.test(e.key) && e.key !== "Backspace" && e.key !== "Delete") {
      e.preventDefault()
      return
    }
    if (e.key.match(/[0-9]/)) {
      if (digitCount >= 10) {
        e.preventDefault()
        return
      }
      setDigitCount(digitCount + 1)
    } else if (e.key === "Backspace" || e.key === "Delete") {
      const currentDigits = (phoneNumber.match(/\d/g) || []).length
      setDigitCount(Math.max(0, currentDigits - 1))
    }
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-8 mb-7">
        <div className="flex flex-col gap-4">
          <label className="flex items-center text-gray-700 text-base font-medium">Add your profile</label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center text-6xl text-gray-500">👤</div>
            <button
              type="button"
              className="bg-[#26A69A] text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#20897f] transition-all duration-300"
              onClick={() => document.getElementById("profilePicture").click()}
            >
              Upload photo
            </button>
            <input
              type="file"
              id="profilePicture"
              name="profilePicture"
              onChange={handleChange}
              className="hidden"
              accept="image/*"
            />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phoneNumber" className="flex items-center text-gray-700 text-base font-medium">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            onKeyPress={handlePhoneKeyPress}
            maxLength="14" // Accounts for spaces, hyphens, and parentheses (e.g., (123) 456-7890)
            pattern="^\+?[\d\s\-\(\)]{10,14}$"
            className="w-full p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 border-gray-300"
            placeholder="Enter contact number"
            title="Please enter a valid phone number with up to 10 digits"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="currentStatus" className="flex items-center text-gray-700 text-base font-medium">Current Status</label>
          <select
            id="currentStatus"
            name="currentStatus"
            value={currentStatus}
            onChange={handleChange}
            className="w-full h-12 p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsPSIjNkI3MjgwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjI5MyA1LjI5M2EuNzEuNzEgMCAwIDEgMS4wMDQtLjAwNEw4IDguOTc2lDMuNzA3LTMuNzA3YS43MS43MSAwIDAgMSAxLjAwNSAwIC43MS43MSAwIDAgMSAwIDEuMDA1TDEwLjAwNSAxMC43MDdhLjcxLjcxIDAgMCAxLTEuMDA0IDBMMy4yOTMgNi4yOTdhLjcxLjcxIDAgMCAxIDAtMS4wMDV6Ii8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_12px] pr-8 border-gray-300"
          >
            <option value="">Select status</option>
            <option value="Student">Student</option>
            <option value="Job Seeker">Job Seeker</option>
            <option value="Early Professional">Early Professional</option>
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="interestArea" className="flex items-center text-gray-700 text-base font-medium">Interest Area</label>
          <select
            id="interestArea"
            name="interestArea"
            value={interestArea}
            onChange={handleChange}
            className="w-full h-12 p-3 border rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsPSIjNkI3MjgwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjI5MyA1LjI5M2EuNzEuNzEgMCAwIDEgMS4wMDQtLjAwNEw4IDguOTc2lDMuNzA3LTMuNzA3YS43MS43MSAwIDAgMSAxLjAwNSAwIC43MS43MSAwIDAgMSAwIDEuMDA1TDEwLjAwNSAxMC43MDdhLjcxLjcxIDAgMCAxLTEuMDA0IDBMMy4yOTMgNi4yOTdhLjcxLjcxIDAgMCAxIDAtMS4wMDV6Ii8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[right_0.75rem_center] bg-[length:12px_12px] pr-8 border-gray-300"
          >
            <option value="">Select interest</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default MenteeProfileStep