import React from 'react';
import { FiUser, FiMail, FiPhone, FiAward, FiLayers, FiCamera } from 'react-icons/fi';
import { FiSave, FiX } from 'react-icons/fi';

const EditProfile = ({
  editedProfile,
  errors,
  handleChange,
  handleSave,
  handleCancel,
}) => {
  const renderInput = (label, name, value, icon, isSelect = false, options = [], isTextarea = false, isNumber = false) => (
    <div className="flex flex-col gap-2 w-full border-b border-gray-200 py-4 last:border-b-0 transition-opacity duration-300">
      <label className="text-sm font-semibold text-gray-600 flex items-center">
        {React.cloneElement(icon, { className: 'w-5 h-5 text-[#26A69A] mr-2' })}
        {label}
      </label>
      {isSelect ? (
        <select
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/50 transition duration-300"
        >
          <option value="" disabled>
            {name === 'yearsOfExperience' ? '---Experience in years---' : `Select ${label.toLowerCase()}`}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : isTextarea ? (
        <textarea
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/50 transition duration-300 resize-none min-h-[100px]"
          placeholder={name === 'bio' ? 'A short description about yourself' : `Enter ${label.toLowerCase()}`}
        />
      ) : (
        <input
          type={isNumber ? 'number' : name === 'email' ? 'email' : name === 'phoneNumber' ? 'tel' : 'text'}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/50 transition duration-300"
          placeholder={
            name === 'phoneNumber' ? 'Enter contact number' :
            name === 'sessionPrice' ? 'Enter session price per hour' :
            `Enter ${label.toLowerCase()}`
          }
          min={isNumber ? 0 : undefined}
        />
      )}
      {errors[name] && <p className="text-red-500 text-xs mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Edit Profile</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={handleSave}
            className="flex items-center px-5 py-2.5 bg-[#26A69A] text-white rounded-lg shadow-md hover:bg-[#208f84] hover:scale-105 transition duration-300 text-sm font-semibold"
          >
            <FiSave className="mr-2 w-5 h-5" />
            Save
          </button>
          <button
            onClick={handleCancel}
            className="flex items-center px-5 py-2.5 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 hover:scale-105 transition duration-300 text-sm font-semibold"
          >
            <FiX className="mr-2 w-5 h-5" />
            Cancel
          </button>
        </div>
      </div>
 
      <div className="flex flex-col gap-2 mt-6">
        {renderInput('Name', 'name', editedProfile?.user?.name, <FiUser />)}
        {renderInput('Email', 'email', editedProfile?.user?.email, <FiMail />)}
        {renderInput('Phone Number', 'phoneNumber', editedProfile?.phoneNumber, <FiPhone />)}
        {renderInput('Bio', 'bio', editedProfile?.bio, <FiAward />, false, [], true)}
        {renderInput('Session Price (Nrs.)', 'sessionPrice', editedProfile?.price, <FiAward />, false, [], false, true)}
        {renderInput(
          'Area of Expertise',
          'areaOfExpertise',
          editedProfile?.area,
          <FiLayers />,
          true,
          [
            'Technology',
            'Business & Entrepreneurship',
            'Career & Professional Growth',
            'Soft Skills & Leadership',
            'Education & Academics',
            'Design & UX'
          ]
        )}
        {renderInput(
          'Professional Title',
          'professionalTitle',
          editedProfile?.title,
          <FiAward />,
          true,
          [
            'Software Engineer',
            'Project Manager',
            'Data Scientist',
            'Designer',
            'Consultant'
          ]
        )}
        {renderInput(
          'Years of Experience',
          'yearsOfExperience',
          editedProfile?.experience,
          <FiAward />,
          true,
          ['0-1', '2-3', '3-4', '5+']
        )}
      </div>
    </>
  );
};

export default EditProfile;