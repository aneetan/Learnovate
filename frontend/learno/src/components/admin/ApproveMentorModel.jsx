import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ApproveMentorModel = ({ isOpen, onClose, mentor, onApprove, isApproving }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex bg-black/30 backdrop-blur-sm items-start justify-center z-50">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-opacity-50"
        onClick={onClose}
      />
      
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Confirm Approval
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Close</span>
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mb-6">
            <p className="text-gray-600 w-[90%] text-wrap">
              Are you sure you want to approve 
              <span className="font-semibold"> {mentor?.user?.name} </span>  as a mentor?
            </p>
            <p className='text-gray-500 font-normal mt-2'> This will grant all mentor access!</p>
          </div>
          
          <div className="flex justify-end space-x-3">
            <button
              onClick={onClose}
              disabled={isApproving}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={() => onApprove(mentor.mentorId)}
              disabled={isApproving}
              className={`px-4 py-2 bg-[var(--primary-color)] text-white rounded-md text-sm font-medium hover:bg-[var(--primary-dark)] ${
                isApproving ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isApproving ? 'Approving...' : 'Approve'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

ApproveMentorModel.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  mentor: PropTypes.object,
  onApprove: PropTypes.func.isRequired,
  isApproving: PropTypes.bool,
};

export default ApproveMentorModel;