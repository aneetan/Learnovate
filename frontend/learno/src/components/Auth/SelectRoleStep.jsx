const SelectRoleStep = ({ formData, handleChange }) => {
  const { role } = formData;

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Select Your Role</h3>
      <div className="grid grid-cols-1 max-w-[300px] mx-auto min-h-[120px] gap-8 mb-7 md:max-w-full md:min-h-[100px]">
        <div className="flex flex-col gap-4">
          <label htmlFor="role" className="flex items-center text-gray-700 text-base font-medium">
            I want to be a:
          </label>
          <div className="relative w-full"> {/* Added relative wrapper */}
            <select
              id="role"
              name="role"
              value={role}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8" 
            >
              <option value="">Select a role</option>
              <option value="mentee">Mentee</option>
              <option value="mentor">Mentor</option>
            </select>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default SelectRoleStep;
