import React from 'react';

const MenteeProfileStep = ({ formData, handleChange }) => {
  const { phoneNumber, currentStatus, interestArea } = formData;

  const DropdownIcon = () => (
    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        ></path>
      </svg>
    </div>
  );

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Mentee Profile</h3>
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
        <div className="flex flex-col gap-4">
          <label htmlFor="phoneNumber" className="flex items-center text-gray-700 text-base font-medium">Phone Number</label>
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
            placeholder="Enter contact number"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="currentStatus" className="flex items-center text-gray-700 text-base font-medium">Current Status</label>
          <div className="relative"> {/* Added relative container for the dropdown */}
            <select
              id="currentStatus"
              name="currentStatus"
              value={currentStatus}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8"
            >
              <option value="">Select status</option>
              <option value="Student">Student</option>
              <option value="Job Seeker">Job Seeker</option>
              <option value="Early Professional">Early Professional</option>
            </select>
            <DropdownIcon /> {/* Integrated the dropdown icon */}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="interestArea" className="flex items-center text-gray-700 text-base font-medium">Interest Area</label>
          <div className="relative"> {/* Added relative container for the dropdown */}
            <select
              id="interestArea"
              name="interestArea"
              value={interestArea}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8"
            >
              <option value="">Select interest</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            <DropdownIcon /> {/* Integrated the dropdown icon */}
          </div>
        </div>
      </div>
    </>
  );
};

export default MenteeProfileStep;