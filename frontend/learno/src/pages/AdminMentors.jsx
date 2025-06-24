import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaEye, FaUserTie } from 'react-icons/fa';

const AdminMentors = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Dummy data for mentors
  const dummyMentors = [
    { id: 'MNT001', name: 'Dr. Sarah Johnson', email: 'sarah.johnson@example.com', contact: '+1 234-567-8900', interestArea: 'React Development', status: 'Accepted' },
    { id: 'MNT002', name: 'Prof. Michael Chen', email: 'michael.chen@example.com', contact: '+1 234-567-8901', interestArea: 'UI/UX Design', status: 'Accepted' },
    { id: 'MNT003', name: 'Alex Rodriguez', email: 'alex.rodriguez@example.com', contact: '+1 234-567-8902', interestArea: 'Python Programming', status: 'Pending' },
    { id: 'MNT004', name: 'Dr. Emily Davis', email: 'emily.davis@example.com', contact: '+1 234-567-8903', interestArea: 'Data Science', status: 'Accepted' },
    { id: 'MNT005', name: 'James Wilson', email: 'james.wilson@example.com', contact: '+1 234-567-8904', interestArea: 'Mobile Development', status: 'Rejected' },
    { id: 'MNT006', name: 'Lisa Anderson', email: 'lisa.anderson@example.com', contact: '+1 234-567-8905', interestArea: 'Web Development', status: 'Accepted' },
    { id: 'MNT007', name: 'David Thompson', email: 'david.thompson@example.com', contact: '+1 234-567-8906', interestArea: 'DevOps', status: 'Pending' },
    { id: 'MNT008', name: 'Maria Garcia', email: 'maria.garcia@example.com', contact: '+1 234-567-8907', interestArea: 'Product Management', status: 'Accepted' },
    { id: 'MNT009', name: 'Robert Taylor', email: 'robert.taylor@example.com', contact: '+1 234-567-8908', interestArea: 'Machine Learning', status: 'Accepted' },
    { id: 'MNT010', name: 'Jennifer Brown', email: 'jennifer.brown@example.com', contact: '+1 234-567-8909', interestArea: 'Cybersecurity', status: 'Pending' },
    { id: 'MNT011', name: 'Christopher Lee', email: 'christopher.lee@example.com', contact: '+1 234-567-8910', interestArea: 'Blockchain', status: 'Accepted' },
    { id: 'MNT012', name: 'Amanda White', email: 'amanda.white@example.com', contact: '+1 234-567-8911', interestArea: 'Cloud Computing', status: 'Rejected' },
    { id: 'MNT013', name: 'Daniel Martinez', email: 'daniel.martinez@example.com', contact: '+1 234-567-8912', interestArea: 'Game Development', status: 'Accepted' },
    { id: 'MNT014', name: 'Michelle Clark', email: 'michelle.clark@example.com', contact: '+1 234-567-8913', interestArea: 'Digital Marketing', status: 'Pending' },
    { id: 'MNT015', name: 'Kevin Lewis', email: 'kevin.lewis@example.com', contact: '+1 234-567-8914', interestArea: 'Artificial Intelligence', status: 'Accepted' },
  ];

  // Filter mentors based on search term
  const filteredMentors = useMemo(() => {
    return dummyMentors.filter(mentor =>
      mentor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.interestArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mentor.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredMentors.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentMentors = filteredMentors.slice(startIndex, endIndex);

  const handleEdit = (mentorId) => {
    console.log(`Editing mentor: ${mentorId}`);
    // Here you would typically open an edit modal or navigate to edit page
  };

  const handleDelete = (mentorId) => {
    console.log(`Deleting mentor: ${mentorId}`);
    // Here you would typically show a confirmation dialog and then delete
  };

  const handleViewProfile = (mentorId) => {
    console.log(`Viewing profile for mentor: ${mentorId}`);
    // Here you would typically navigate to the mentor's profile page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Accepted':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full space-y-8 px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--primary-color)' }}>
          <FaUserTie className="w-8 h-8" />
          Mentors Management
        </h1>
        <p className="text-gray-600 mt-2">Manage all registered mentors and their application status.</p>
      </div>

      {/* Search and Entries */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="relative w-full sm:w-auto">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search mentors..."
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
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          <span className="text-sm text-gray-600">entries</span>
        </div>
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden p-6"
      >
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentMentors.map((mentor, index) => (
                <motion.tr
                  key={mentor.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{mentor.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{mentor.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentor.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentor.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{mentor.interestArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(mentor.status)}`}>
                      {mentor.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(mentor.id)}
                      className="text-sm font-medium flex items-center space-x-1"
                      style={{ color: 'var(--primary-color)' }}
                    >
                      <FaEye className="w-3 h-3" />
                      <span>View Profile</span>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(mentor.id)}
                        className="p-1 rounded"
                        style={{ color: 'var(--primary-color)' }}
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(mentor.id)}
                        className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                        title="Delete"
                      >
                        <FaTrash className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
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
                <span className="font-medium">{Math.min(endIndex, filteredMentors.length)}</span> of{' '}
                <span className="font-medium">{filteredMentors.length}</span> results
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

        {/* Copyright Footer */}
        <div className="text-center py-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Copyright © 2025. Learnovate. All rights reserved.
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminMentors;