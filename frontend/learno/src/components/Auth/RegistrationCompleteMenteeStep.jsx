const RegistrationCompleteMenteeStep = ({ formData, handleChange }) => {
  const { agreedToTerms } = formData

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Registration Complete</h3>
      <p className="mb-4">No additional information required for mentees.</p>
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

export default RegistrationCompleteMenteeStep