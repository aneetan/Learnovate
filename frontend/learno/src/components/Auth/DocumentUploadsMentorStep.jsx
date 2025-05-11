const DocumentUploadsMentorStep = ({ formData, handleChange }) => {
  const { agreedToTerms } = formData

  return (
    <>
      <div className="grid grid-cols-1 gap-8 mb-7 ">
        <div className="flex flex-col gap-4">
          <label className="flex items-center text-gray-700 text-base font-medium">Add your profile</label>
          <div className="flex flex-col items-center gap-4">
            <div className="w-[120px] h-[120px] rounded-full bg-gray-200 flex items-center justify-center text-5xl text-gray-500 md:w-[100px] md:h-[100px]">👤</div>
            <button
              type="button"
              className="bg-[#26A69A] text-white px-5 py-2 rounded-lg text-sm font-medium cursor-pointer hover:bg-[#20897f] transition-all duration-300 md:px-4 md:text-xs"
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
          <label className="flex items-center text-gray-700 text-base font-medium">Add relevant documents (for verification)</label>
          <div className="flex justify-center items-center border-2 border-dashed border-gray-300 rounded-lg p-8 bg-gray-50 hover:border-[#26A69A] hover:bg-gray-100 focus-within:border-[#26A69A] focus-within:bg-gray-100 transition-all duration-300 cursor-pointer text-center min-h-[150px] md:p-6">
            <div className="flex flex-col gap-2 text-gray-500">
              <span className="text-4xl">☁</span>
              <span>Browse Files</span>
              <span>Drag and drop files here</span>
            </div>
            <input
              type="file"
              id="documents"
              name="documents"
              onChange={handleChange}
              className="hidden"
              accept=".pdf,.doc,.docx"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <label className="flex items-center text-gray-700 text-base font-medium">
          <input
            type="checkbox"
            id="agreedToTerms"
            name="agreedToTerms"
            checked={agreedToTerms}
            onChange={handleChange}
            className="mr-2 w-5 h-5 accent-[#26A69A] cursor-pointer"
          />
          I agree to the Terms & Conditions and Policy
        </label>
      </div>
    </>
  )
}

export default DocumentUploadsMentorStep