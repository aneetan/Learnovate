const Stepper = ({ step, role }) => {
  const totalSteps = role === "mentor" ? 5 : 4
  const progress = role === "mentee"
    ? ((step - 1) / (totalSteps - 1)) * 75 // Starts at 50% and progresses to 83.33%, 116.67%, 150% (capped at 100%)
    : ((step - 1) / (totalSteps - 1)) * 100 // Remains 0%, 25%, 50%, 75%, 100% for mentors

  return (
    <div className="mb-8 relative w-full">
      <div className="flex justify-between">
        {role === "mentor" ? (
          <>
            <div className={`flex items-center text-center p-2 ${step >= 3 ? "text-[#26A69A]" : "text-gray-500"} font-medium text-base`}>
              <span className={`w-8 h-8 ${step >= 3 ? "bg-[#26A69A] text-white" : "bg-gray-300"} rounded-full flex items-center justify-center mr-3 text-lg transition-colors duration-300`}>1</span>
              Additional Information
            </div>
            <div className={`flex items-center text-center p-2 ${step >= 4 ? "text-[#26A69A]" : "text-gray-500"} font-medium text-base`}>
              <span className={`w-8 h-8 ${step >= 4 ? "bg-[#26A69A] text-white" : "bg-gray-300"} rounded-full flex items-center justify-center mr-3 text-lg transition-colors duration-300`}>2</span>
              Professional Information
            </div>
            <div className={`flex items-center text-center p-2 ${step >= 5 ? "text-[#26A69A]" : "text-gray-500"} font-medium text-base`}>
              <span className={`w-8 h-8 ${step >= 5 ? "bg-[#26A69A] text-white" : "bg-gray-300"} rounded-full flex items-center justify-center mr-3 text-lg transition-colors duration-300`}>3</span>
              Document Uploads
            </div>
          </>
        ) : (
          <>
            <div className={`flex items-center text-center p-2 ${step >= 3 ? "text-[#26A69A]" : "text-gray-500"} font-medium text-base`}>
              <span className={`w-8 h-8 ${step >= 3 ? "bg-[#26A69A] text-white" : "bg-gray-300"} rounded-full flex items-center justify-center mr-3 text-lg transition-colors duration-300`}>1</span>
              Mentee Profile
            </div>
            <div className={`flex items-center text-center p-2 ${step >= 4 ? "text-[#26A69A]" : "text-gray-500"} font-medium text-base`}>
              <span className={`w-8 h-8 ${step >= 4 ? "bg-[#26A69A] text-white" : "bg-gray-300"} rounded-full flex items-center justify-center mr-3 text-lg transition-colors duration-300`}>2</span>
              Registration Complete
            </div>
          </>
        )}
      </div>
      <div className="mt-4 w-full h-2 bg-gray-200 rounded-full">
        <div
          className="h-full bg-[#26A69A] rounded-full transition-all duration-300"
          style={{ width: `${Math.min(progress, 100)}%` }} // Cap at 100% to prevent overflow
        ></div>
      </div>
    </div>
  )
}

export default Stepper