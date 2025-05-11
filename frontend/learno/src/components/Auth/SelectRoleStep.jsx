const SelectRoleStep = ({ formData, handleChange }) => {
  const { role } = formData

  return (
    <>
      <h3 className="text-xl text-gray-700 mb-6 font-semibold">Select Your Role</h3>
      <div className="grid grid-cols-1 max-w-[300px] mx-auto min-h-[120px] gap-8 mb-7 md:max-w-full md:min-h-[100px]">
        <div className="flex flex-col gap-4">
          <label htmlFor="role" className="flex items-center text-gray-700 text-base font-medium">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={handleChange}
            className="w-full h-12 p-3 border border-gray-300 rounded-lg text-base text-gray-900 bg-white focus:outline-none focus:border-[#26A69A] focus:ring-2 focus:ring-[#26A69A]/10 transition-all duration-300 appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNiIgaGVpZ2h0PSIxNiIgdmlld0JveD0iMCAwIDE2IDE2Ij4KICA8cGF0aCBmaWxsPSIjNkI3MjgwIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0zLjI5MyA1LjI5M2EuNzEuNzEgMCAwIDEgMS4wMDQtLjAwNEw4IDguOTc2bDMuNzA3LTMuNzA3YS43MS43MSAwIDAgMSAxLjAwNSAwIC43MS43MSAwIDAgMSAwIDEuMDA1TDEwLjAwNSAxMC43MDdhLjcxLjcxIDAgMCAxLTEuMDA0IDBMMy4yOTMgNi4yOTdhLjcxLjcxIDAgMCAxIDAtMS4wMDV6Ii8+Cjwvc3ZnPgo=')] bg-no-repeat bg-[position:right_0.75rem_center] bg-[length:12px_12px] pr-8"
          >
            <option value="">Select a role</option>
            <option value="mentee">Mentee</option>
            <option value="mentor">Mentor</option>
          </select>
        </div>
      </div>
    </>
  )
}

export default SelectRoleStep