import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaUser, FaEnvelope, FaTrash, FaEye, FaSearch } from 'react-icons/fa';

const AdminReviews = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(6);

  const [reviews, setReviews] = useState([
    {
      id: 'REV001',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      name: 'John Smith',
      email: 'john.smith@example.com',
      description: 'Excellent mentor! Sarah helped me understand React concepts that I was struggling with for months. Her teaching style is very clear and patient.',
      rating: 5,
      mentorName: 'Sarah Johnson',
      date: '2024-01-15'
    },
    {
      id: 'REV002',
      profileImage: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      name: 'Emily Davis',
      email: 'emily.davis@example.com',
      description: 'Michael is an amazing mentor. His expertise in UI/UX design is outstanding and he provided practical examples that really helped me improve my skills.',
      rating: 5,
      mentorName: 'Michael Chen',
      date: '2024-01-14'
    },
    {
      id: 'REV003',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      name: 'David Wilson',
      email: 'david.wilson@example.com',
      description: 'Great session with Alex. He explained Python concepts very well and gave me some useful resources for further learning.',
      rating: 4,
      mentorName: 'Alex Rodriguez',
      date: '2024-01-13'
    },
    {
      id: 'REV004',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      name: 'Lisa Anderson',
      email: 'lisa.anderson@example.com',
      description: 'Dr. Emily is incredibly knowledgeable about data science. The session was very informative and I learned a lot about machine learning algorithms.',
      rating: 5,
      mentorName: 'Dr. Emily Davis',
      date: '2024-01-12'
    },
    {
      id: 'REV005',
      profileImage: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      name: 'Robert Taylor',
      email: 'robert.taylor@example.com',
      description: 'James helped me understand mobile development concepts. The session was good but I wish it was a bit longer to cover more topics.',
      rating: 4,
      mentorName: 'James Wilson',
      date: '2024-01-11'
    },
    {
      id: 'REV006',
      profileImage: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      name: 'Maria Garcia',
      email: 'maria.garcia@example.com',
      description: 'Lisa is a fantastic mentor for web development. She explained complex concepts in simple terms and provided hands-on examples.',
      rating: 5,
      mentorName: 'Lisa Anderson',
      date: '2024-01-10'
    },
    {
      id: 'REV007',
      profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      name: 'Thomas Brown',
      email: 'thomas.brown@example.com',
      description: 'Amazing experience with the mentor. Very knowledgeable and patient with explanations.',
      rating: 5,
      mentorName: 'Jennifer White',
      date: '2024-01-09'
    },
    {
      id: 'REV008',
      profileImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      name: 'Sarah Miller',
      email: 'sarah.miller@example.com',
      description: 'Great session! The mentor provided valuable insights and practical tips for my project.',
      rating: 4,
      mentorName: 'David Thompson',
      date: '2024-01-08'
    }
  ]);

  // Filter reviews based on search term
  const filteredReviews = useMemo(() => {
    return reviews.filter(review =>
      review.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.mentorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [reviews, searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredReviews.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentReviews = filteredReviews.slice(startIndex, endIndex);

  const handleDelete = (reviewId) => {
    setReviews(reviews.filter(review => review.id !== reviewId));
  };

  const handleViewDetails = (reviewId) => {
    console.log(`Viewing details for review: ${reviewId}`);
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

  return (
    <div className="w-full space-y-8 px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--primary-color)' }}>
          <FaStar className="w-8 h-8" />
          Reviews Management
        </h1>
        <p className="text-gray-600 mt-2">Manage and moderate user reviews for mentors.</p>
      </div>

      {/* Search and Entries */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="relative w-full sm:w-auto">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search reviews..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {currentReviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <img
                  src={review.profileImage}
                  alt={review.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                  <div className="flex items-center space-x-1">
                    {renderStars(review.rating)}
                    <span className="text-sm text-gray-600 ml-2">({review.rating}/5)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Review Details */}
            <div className="space-y-3 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaEnvelope className="w-4 h-4 mr-2 text-gray-400" />
                <span>{review.email}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaUser className="w-4 h-4 mr-2 text-gray-400" />
                <span>Mentor: <span className="font-medium">{review.mentorName}</span></span>
              </div>
              <div className="text-sm text-gray-500">
                Date: {review.date}
              </div>
            </div>

            {/* Review Description */}
            <div className="mb-4">
              <p className="text-gray-700 text-sm leading-relaxed">{review.description}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleViewDetails(review.id)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
              >
                <FaEye className="w-4 h-4" />
                View Details
              </button>
              <button
                onClick={() => handleDelete(review.id)}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <FaTrash className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-lg shadow-sm border border-gray-200">
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
                <span className="font-medium">{Math.min(endIndex, filteredReviews.length)}</span> of{' '}
                <span className="font-medium">{filteredReviews.length}</span> results
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

      {/* Empty State */}
      {filteredReviews.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <FaStar className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No reviews found</h3>
          <p className="text-gray-600">
            {searchTerm ? "No reviews match your search criteria." : "There are no reviews yet."}
          </p>
        </motion.div>
      )}

      {/* Copyright Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Copyright © 2025. Learnovate. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminReviews; 