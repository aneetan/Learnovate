import React from 'react';
import { FaTimes, FaCheck } from 'react-icons/fa';

const ApprovalModal = ({ isOpen, onClose, onApprove, message }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-green-100">
              <FaCheck className="w-5 h-5 text-green-600" />
            </span>
            <h2 className="text-lg font-semibold text-gray-900">Confirm Approval</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <FaTimes className="w-5 h-5" />
          </button>
        </div>
        <div className="p-6">
          <p className="text-gray-700 mb-6">{message}</p>
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onApprove}
              className="px-8 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700"
              style={{ minWidth: '120px' }}
            >
              <FaCheck className="w-4 h-4 mr-2" />
              <span>Approve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApprovalModal; 