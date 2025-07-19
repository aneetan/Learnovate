import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DocumentModal from '../../components/common/DocumentModal';
import { FiUser } from 'react-icons/fi';
import MentorProfileCard from '../../components/Mentor/MentorProfileCard';
import axios from 'axios';
import { API_URL } from '../../config/config';


const AdminMentorProfile = ({isAdmin}) => {
  const { mentorId } = useParams();
  const [mentor, setMentor] = useState(null);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [showApprove, setShowApprove] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMentorProfile = async () => {
      setLoading(true)
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${API_URL}/mentee/getMentors/${mentorId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        console.log(response.data)
        setMentor(response.data)
      } catch (err) {
        setError(err.message)
      } finally{
        setLoading(false)
      }
    }

    fetchMentorProfile()
  }, [mentorId]);

  return (
    loading ? (
      <div> Loading.... </div>
    ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : !mentor ? (
    <div> Mentor data not available </div>
  ) : (
    
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
         <div className="bg-white rounded-b-lg shadow-lg pt-20 pb-8 px-8 mt-0">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{mentor.user.name}</h2>
          <p className=" text-gray-500 mb-6">{mentor.title}</p>
          <div className="grid grid-cols-1 gap-4 mb-4">
            <div>
              <span className="block text-xs text-gray-500 mb-1">Name</span>
              <span className="text-gray-800">{mentor.user.name}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Email</span>
              <span className="text-gray-800">{mentor.user.email}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Phone Number</span>
              <span className="text-gray-800">{mentor.phoneNumber}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Bio</span>
              <span className="text-gray-800 whitespace-pre-line">{mentor.bio}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Session Price (Nrs.)</span>
              <span className="text-gray-800">Nrs. {mentor.price}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Area of Expertise</span>
              <span className="text-gray-800">{mentor.area}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Professional Title</span>
              <span className="text-gray-800">{mentor.title}</span>
            </div>
            <div>
              <span className="block text-xs text-gray-500 mb-1">Years of Experience</span>
              <span className="text-gray-800">{mentor.experience}</span>
            </div>
          </div>
        </div>
        {isAdmin  && (
          <div>
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
        )}
      </div>
    </div>
    )
  );
};

export default AdminMentorProfile; 