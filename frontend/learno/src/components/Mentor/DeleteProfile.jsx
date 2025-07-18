import React from 'react';
import { FiTrash2 } from 'react-icons/fi';

const DeleteAccount = ({ handleDeleteAccount }) => {
  return (
    <div className="mt-8">
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="max-w-xs">
          <h4 className="text-sm font-semibold text-gray-900 mb-1">Delete Account</h4>
          <p className="text-sm text-gray-600">
            Permanently delete your account and all associated data. This action cannot be undone.
          </p>
        </div>
        <button
          onClick={handleDeleteAccount}
          className="flex items-center px-5 py-2.5 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition duration-300 text-sm font-semibold"
        >
          <FiTrash2 className="mr-2 w-5 h-5" />
          Delete Account
        </button>
      </div>
    </div>
  );
};

export default DeleteAccount;