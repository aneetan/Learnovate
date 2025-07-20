import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser, FaEnvelope, FaEye, FaSearch, FaComment, FaThumbsUp, FaLightbulb, FaBug, FaHeart, FaTrash, FaEdit } from 'react-icons/fa';
import { PagePreloader } from '../../components/common/Preloader';
import DetailsModal from '../../components/common/DetailsModal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import EditModal from '../../components/common/EditModal';
import axios from 'axios';
import { API_URL } from '../../config/config';

const AdminReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState(null);

  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
      const fetchFeedbackData = async () => {
        try {
          // Fetch total users
          const feedback = await axios.get(`${API_URL}/admin/getAllFeedback`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          setFeedback(feedback.data);
        } catch (e){
          console.log(e)
        }
      };
  
      fetchFeedbackData();
    }, []);

  // Filter feedback based on search term (name only)
  const filteredFeedback = useMemo(() => {
    return feedback.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [feedback, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredFeedback.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentFeedback = filteredFeedback.slice(startIndex, endIndex);

  const handleViewDetails = (feedback) => {
    setSelectedFeedback(feedback);
    setShowDetailsModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FaStar
        key={index}
        className={`w-4 h-4 ${index < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Feature Request':
        return <FaLightbulb className="w-4 h-4" />;
      case 'Bug Report':
        return <FaBug className="w-4 h-4" />;
      case 'General Feedback':
        return <FaHeart className="w-4 h-4" />;
      default:
        return <FaThumbsUp className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return <PagePreloader text="Loading Feedback..." />;
  }

  return (
    <div className="w-full space-y-6 px-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold flex items-center gap-3 mb-2" style={{ color: 'var(--primary-color)' }}>
          <FaComment className="w-6 h-6" />
          Feedback Management
        </h1>
        </div>

      {/* Search and Entries */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
        <div className="relative w-full sm:w-auto">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search feedback..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
            style={{ '--tw-ring-color': 'var(--primary-color)' }}
          />
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">Show</span>
          <select
            value={entriesPerPage}
            onChange={(e) => {
              setEntriesPerPage(Number(e.target.value));
              setCurrentPage(1);
            }}
            className="border border-gray-300 rounded-lg px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
            style={{ '--tw-ring-color': 'var(--primary-color)' }}
          >
            <option value={6}>6</option>
            <option value={12}>12</option>
            <option value={18}>18</option>
            <option value={24}>24</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
      </div>

      {/* Feedback Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6"
      >
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentFeedback.map((item, index) => (
                <motion.tr
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-1">
                      {renderStars(item.rating)}
                      <span className="text-sm text-gray-600 ml-2">({item.rating}/5)</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{item.category}</td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    <div className="max-w-xs">
                      <p className="line-clamp-2">{item.message}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewDetails(item)}
                      className="text-sm font-medium flex items-center space-x-1 text-green-700 hover:text-green-900"
                    >
                      <span>View Details</span>
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
            <div className="flex-1 flex justify-between sm:hidden">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Previous
              </button>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
                  <span className="font-medium">{Math.min(endIndex, filteredFeedback.length)}</span> of{' '}
                  <span className="font-medium">{filteredFeedback.length}</span> results
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                      }`}
                      style={currentPage === page ? { backgroundColor: 'var(--primary-lightest)', borderColor: 'var(--primary-color)', color: 'var(--primary-color)' } : {}}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </nav>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Empty State */}
      {currentFeedback.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-16 bg-white rounded-xl shadow-lg border border-gray-200"
        >
          <div className="text-gray-400 mb-6">
            <FaComment className="w-20 h-20 mx-auto" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">No feedback found</h3>
          <p className="text-gray-600 max-w-md mx-auto">
            {searchTerm ? `No feedback matching "${searchTerm}" found.` : "No feedback has been submitted yet."}
          </p>
        </motion.div>
      )}

      {/* Copyright Footer */}
      <div className="text-center py-8 border-t border-gray-200 mt-8">
        <p className="text-sm text-gray-500">
          Copyright © 2025. Learnovate. All rights reserved.
        </p>
      </div>

      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        userData={selectedFeedback}
        type="feedback"
      />
    </div>
  );
};

export default AdminReviews; 