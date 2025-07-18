import React from 'react';

const DeleteConfirmationModal = ({ showModal, cancelDelete, confirmDelete }) => {
  if (!showModal) return null;

  return (
    <div
      className="fixed inset-0 bg-transparent bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={cancelDelete}
    >
      <div
        className="bg-white rounded-lg shadow-lg w-full max-w-sm sm:max-w-md p-4 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Confirm Account Deletion</h3>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete your account? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={cancelDelete}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-sm hover:bg-gray-600 hover:scale-105 transition duration-300 text-sm font-semibold"
          >
            Cancel
          </button>
          <button
            onClick={confirmDelete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg shadow-sm hover:bg-red-600 hover:scale-105 transition duration-300 text-sm font-semibold"
          >
            Confirm Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;