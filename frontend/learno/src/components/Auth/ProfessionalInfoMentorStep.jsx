const ProfessionalInfoMentorStep = ({ formData, handleChange }) => {
  const { areaOfExpertise, professionalTitle, yearsOfExperience, skills } = formData;

  return (
    <>
      <div className="grid grid-cols-2 gap-8 mb-7">
        <div className="flex flex-col gap-4">
          <label htmlFor="areaOfExpertise" className="flex items-center text-gray-700 text-base font-medium">
            Area of Expertise
          </label>
          <div className="relative w-full"> {/* Added relative wrapper */}
            <select
              id="areaOfExpertise"
              name="areaOfExpertise"
              value={areaOfExpertise}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8" 
            >
              <option value="">Select an area</option>
              <option value="Technology">Technology</option>
              <option value="Business">Business</option>
              <option value="Design">Design</option>
              <option value="Marketing">Marketing</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">  {/* Added icon div */}
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
        <div className="flex flex-col gap-4">
          <label htmlFor="professionalTitle" className="flex items-center text-gray-700 text-base font-medium">
            Professional Title
          </label>
          <input
            type="text"
            id="professionalTitle"
            name="professionalTitle"
            value={professionalTitle}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
            placeholder="Eg: Software Engineer"
          />
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="yearsOfExperience" className="flex items-center text-gray-700 text-base font-medium">
            Years of Experience
          </label>
          <div className="relative w-full">  {/* Added relative wrapper */}
            <select
              id="yearsOfExperience"
              name="yearsOfExperience"
              value={yearsOfExperience}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8" 
            >
              <option value="">Select range</option>
              <option value="0-1">0-1 years</option>
              <option value="1-2">1-2 years</option>
              <option value="2-3">2-3 years</option>
              <option value="3+">3+ years</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">  {/* Added icon div */}
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
        <div className="flex flex-col gap-4">
          <label htmlFor="skills" className="flex items-center text-gray-700 text-base font-medium">Skills</label>
          <div className="relative w-full">  {/* Added relative wrapper */}
            <select
              id="skills"
              name="skills"
              value={skills}
              onChange={handleChange}
              className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none pr-8"  
            >
              <option value="">Select a skill</option>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="Java">Java</option>
              <option value="C++">C++</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none"> {/* Added icon div */}
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

export default ProfessionalInfoMentorStep;
