import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentModal from '../components/common/DocumentModal';
import { FiUser } from 'react-icons/fi';
import MentorProfileCard from '../components/Mentor/MentorProfileCard';

const dummyMentors = [
  {
    id: 'MNT001',
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    phoneNumber: '9876543210',
    bio: 'Experienced software engineer passionate about mentoring aspiring developers.',
    sessionPrice: '5000',
    areaOfExpertise: 'Technology',
    professionalTitle: 'Software Engineer',
    yearsOfExperience: '5+',
    profileUrl: null,
  },
  {
    id: 'MNT002',
    name: 'Prof. Michael Chen',
    email: 'michael.chen@example.com',
    phoneNumber: '9876543211',
    bio: 'UI/UX expert and mentor.',
    sessionPrice: '6000',
    areaOfExpertise: 'Design',
    professionalTitle: 'Professor',
    yearsOfExperience: '10+',
    profileUrl: null,
  },
  {
    id: 'MNT003',
    name: 'Alex Rodriguez',
    email: 'alex.rodriguez@example.com',
    phoneNumber: '9876543212',
    bio: 'Python developer and mentor.',
    sessionPrice: '4000',
    areaOfExpertise: 'Programming',
    professionalTitle: 'Developer',
    yearsOfExperience: '3+',
    profileUrl: null,
  },
];

const AdminMentorProfile = () => {
  const { mentorId } = useParams();
  const mentor = dummyMentors.find((m) => m.id === mentorId);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showApprove, setShowApprove] = useState(false);

  if (!mentor) {
    return (
      <div className="max-w-2xl mx-auto mt-16 text-center text-gray-500">
        Mentor not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
      <div className="w-full max-w-2xl transition-opacity duration-500">
        {/* Banner */}
        <div className="bg-gradient-to-r from-[#26A69A] to-[#148FA8] h-40 sm:h-48 relative rounded-t-lg shadow-sm">
          <div className="absolute bottom-[-4rem] left-4 sm:left-8">
            <div className="relative group transform hover:scale-105 transition duration-300">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-lg">
                {mentor.profileUrl ? (
                  <img
                    src={mentor.profileUrl}
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-200">
                    <FiUser className="w-16 h-16 sm:w-20 sm:h-20 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        {/* Profile Card */}
        <MentorProfileCard mentor={mentor}/>
        {showDocumentModal && (
          <DocumentModal
            isOpen={showDocumentModal}
            onClose={() => setShowDocumentModal(false)}
            userData={mentor}
            type="mentor"
          />
        )}
        {showApprove && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
            <div className="bg-white rounded-lg shadow-xl p-8 max-w-sm w-full">
              <h3 className="text-lg font-semibold mb-4">Approve Mentor</h3>
              <p className="mb-6 text-gray-700">Are you sure you want to approve this mentor?</p>
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowApprove(false)}
                  className="px-4 py-2 rounded bg-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-300 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowApprove(false)}
                  className="px-4 py-2 rounded bg-green-600 text-white text-sm font-medium hover:bg-green-700 transition-colors"
                >
                  Approve
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMentorProfile; 