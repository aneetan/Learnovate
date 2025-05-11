const AdditionalInfoMentorStep = ({ formData, handleChange }) => {
  const { bio, phoneNumber, sessionPrice } = formData

  return (
    <>
      <div className="grid grid-cols-2 gap-8 mb-7">
        <div className="flex flex-col gap-4 col-span-2">
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
          <label htmlFor="sessionPrice" className="flex items-center text-gray-700 text-base font-medium">Session Price</label>
          <input
            type="text"
            id="sessionPrice"
            name="sessionPrice"
            value={sessionPrice}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300"
            placeholder="Enter session price per hour"
          />
        </div>
      </div>
    </>
  )
}

export default AdditionalInfoMentorStep