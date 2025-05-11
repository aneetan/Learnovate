const Stepper = ({ step, role }) => {
  return (
    <div className="flex justify-between mb-8 relative w-full items-center">
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
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 z-0 transform -translate-y-1/2"></div>
    </div>
  )
}

export default Stepper