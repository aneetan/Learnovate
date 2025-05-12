const RegistrationCompleteMenteeStep = ({ formData, handleChange }) => {
  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Registration Complete</h3>
      <p className="mb-4">No additional information required for mentees.</p>
      <div className="flex flex-col gap-4">
        <p className="text-gray-700 text-base font-medium">
          By creating an account, you agree to our <a href="/terms" className="text-[#26A69A] font-medium hover:underline">Terms</a> and have read and acknowledge the <a href="/privacy" className="text-[#26A69A] font-medium hover:underline">Privacy Statement</a>
        </p>
      </div>
    </>
  )
}

export default RegistrationCompleteMenteeStep