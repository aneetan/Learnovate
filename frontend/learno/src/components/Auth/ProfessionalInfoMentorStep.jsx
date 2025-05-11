const ProfessionalInfoMentorStep = ({ formData, handleChange }) => {
  const { areaOfExpertise, professionalTitle, yearsOfExperience, skills } = formData

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Professional Information</h3>
      <div className="grid grid-cols-2 gap-8 mb-7 md:grid-cols-1">
        <div className="flex flex-col gap-4">
          <label htmlFor="areaOfExpertise" className="flex items-center text-gray-700 text-base font-medium">Area of Expertise</label>
          <select
            id="areaOfExpertise"
            name="areaOfExpertise"
            value={areaOfExpertise}
            onChange={handleChange}
            className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsPSIjNkI3MjgwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjI5MyA1LjI5M2EuNzEuNzEgMCAwIDEgMS4wMDQtLjAwNEw4IDguOTc2bDMuNzA3LTMuNzA3YS43MS43MSAwIDAgMSAxLjAwNSAwIC43MS43MSAwIDAgMSAwIDEuMDA1TDEwLjAwNSAxMC43MDdhLjcxLjcxIDAgMCAxLTEuMDA0IDBMMy4yOTMgNi4yOTdhLjcxLjcxIDAgMCAxIDAtMS4wMDV6Ii8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:12px_12px] pr-8"
          >
            <option value="">Select an area</option>
            <option value="Technology">Technology</option>
            <option value="Business">Business</option>
            <option value="Design">Design</option>
            <option value="Marketing">Marketing</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="professionalTitle" className="flex items-center text-gray-700 text-base font-medium">Professional Title</label>
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
          <label htmlFor="yearsOfExperience" className="flex items-center text-gray-700 text-base font-medium">Years of Experience</label>
          <select
            id="yearsOfExperience"
            name="yearsOfExperience"
            value={yearsOfExperience}
            onChange={handleChange}
            className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsPSIjNkI3MjgwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjI5MyA1LjI5M2EuNzEuNzEgMCAwIDEgMS4wMDQtLjAwNEw4IDguOTc2bDMuNzA3LTMuNzA3YS43MS43MSAwIDAgMSAxLjAwNSAwIC43MS43MSAwIDAgMSAwIDEuMDA1TDEwLjAwNSAxMC43MDdhLjcxLjcxIDAgMCAxLTEuMDA0IDBMMy4yOTMgNi4yOTdhLjcxLjcxIDAgMCAxIDAtMS4wMDV6Ii8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:12px_12px] pr-8"
          >
            <option value="">Select range</option>
            <option value="0-1">0-1 years</option>
            <option value="1-2">1-2 years</option>
            <option value="2-3">2-3 years</option>
            <option value="3+">3+ years</option>
          </select>
        </div>
        <div className="flex flex-col gap-4">
          <label htmlFor="skills" className="flex items-center text-gray-700 text-base font-medium">Skills</label>
          <select
            id="skills"
            name="skills"
            value={skills}
            onChange={handleChange}
            className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsPSIjNkI3MjgwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjI5MyA1LjI5M2EuNzEuNzEgMCAwIDEgMS4wMDQtLjAwNEw4IDguOTc2bDMuNzA3LTMuNzA3YS43MS43MSAwIDAgMSAxLjAwNSAwIC43MS43MSAwIDAgMSAwIDEuMDA1TDEwLjAwNSAxMC43MDdhLjcxLjcxIDAgMCAxLTEuMDA0IDBMMy4yOTMgNi4yOTdhLjcxLjcxIDAgMCAxIDAtMS4wMDV6Ii8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:12px_12px] pr-8"
          >
            <option value="">Select a skill</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Python">Python</option>
            <option value="Java">Java</option>
            <option value="C++">C++</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default ProfessionalInfoMentorStep