import React from 'react';
import { FiSave, FiX, FiCamera, FiUser, FiMail, FiPhone, FiPaperclip } from 'react-icons/fi';

const MenteeEditProfile = ({
  editedProfile,
  profilePreview,
  fileInputRef,
  handleChange,
  handleProfilePictureChange,
  triggerFileInput,
  handleSave,
  handleCancel,
  fetchError
}) => {
  const renderInput = (label, name, value, icon, isSelect = false, options = []) => (
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
            Select {label.toLowerCase()}
          </option>
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={name === 'email' ? 'email' : name === 'phone' ? 'tel' : 'text'}
          name={name}
          value={value || ''}
          onChange={handleChange}
          className="w-full p-3 border border-gray-300 rounded-lg text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#26A69A]/50 transition duration-300"
          placeholder={`Enter ${label.toLowerCase()}`}
        />
      )}
    </div>
  );

  return (
    <div className="pt-24 sm:pt-28 px-4 sm:px-6 pb-10 space-y-6">
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

      {fetchError && <p className="text-red-500 text-sm">{fetchError}</p>}

      <div className="flex flex-col gap-2">
        {renderInput('Name', 'name', editedProfile.name, <FiUser />)}
        {renderInput('Email', 'email', editedProfile.email, <FiMail />)}
        {renderInput('Phone Number', 'phone', editedProfile.phone, <FiPhone />)}
        {renderInput(
          'Current Status',
          'currentStatus',
          editedProfile.currentStatus,
          <FiUser />,
          true,
          ['Student', 'Job Seeker', 'Early Professional']
        )}
        {renderInput(
          'Interest Area',
          'area',
          editedProfile.area,
          <FiPaperclip />,
          true,
          ['Technology', 'Business', 'Design', 'Marketing']
        )}
      </div>
    </div>
  );
};

export default MenteeEditProfile;