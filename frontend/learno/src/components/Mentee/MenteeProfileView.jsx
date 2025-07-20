import React from 'react';
import { FiEdit2, FiMail, FiPaperclip, FiPhone, FiTrash2, FiUser } from 'react-icons/fi';

const MentorProfileView = ({ profile, onEdit, onDelete }) => {
  const renderField = (label, value, icon) => (
    <div className="flex flex-col gap-2 w-full border-b border-gray-200 py-4 last:border-b-0">
      <label className="text-sm font-semibold text-gray-600 flex items-center">
        {React.cloneElement(icon, { className: 'w-5 h-5 text-[#26A69A] mr-2' })}
        {label}
      </label>
      <p className="text-base text-gray-900 font-medium">{value || '-'}</p>
    </div>
  );

  return (
    <div className="pt-24 sm:pt-28 px-4 sm:px-6 pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Profile Details</h2>
        <div className="flex gap-3 flex-wrap">
          <button
            onClick={onEdit}
            className="flex items-center px-5 py-2.5 bg-[#26A69A] text-white rounded-lg shadow-md hover:bg-[#208f84] hover:scale-105 transition duration-300 text-sm font-semibold"
          >
            <FiEdit2 className="mr-2 w-5 h-5" />
            Edit Profile
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {renderField('Name', profile.name, <FiUser />)}
        {renderField('Email', profile.email, <FiMail />)}
        {renderField('Phone Number', profile.phone, <FiPhone />)}
        {renderField('Current Status', profile.currentStatus, <FiUser />)}
        {renderField('Interest Area', profile.area, <FiPaperclip />)}
      </div>

      <div className="mt-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="max-w-xs">
            <h4 className="text-sm font-semibold text-gray-900 mb-1">Delete Account</h4>
            <p className="text-sm text-gray-600">
              Permanently delete your account and all associated data. This action cannot be undone.
            </p>
          </div>
          <button
            onClick={onDelete}
            className="flex items-center px-5 py-2.5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition duration-300 text-sm font-semibold w-full sm:w-auto justify-center sm:justify-start"
          >
            <FiTrash2 className="mr-2 w-5 h-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentorProfileView;