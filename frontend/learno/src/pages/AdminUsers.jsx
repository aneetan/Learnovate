import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaEye, FaUsers } from 'react-icons/fa';
import { PagePreloader } from '../components/common/Preloader';

const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Dummy data for users
  const dummyUsers = [
    { id: 'USR001', name: 'John Doe', email: 'john.doe@example.com', contact: '+1 234-567-8900', interestArea: 'React Development', status: 'Student' },
    { id: 'USR002', name: 'Jane Smith', email: 'jane.smith@example.com', contact: '+1 234-567-8901', interestArea: 'UI/UX Design', status: 'Early Professional' },
    { id: 'USR003', name: 'Mike Johnson', email: 'mike.johnson@example.com', contact: '+1 234-567-8902', interestArea: 'Python Programming', status: 'Job Seeker' },
    { id: 'USR004', name: 'Sarah Wilson', email: 'sarah.wilson@example.com', contact: '+1 234-567-8903', interestArea: 'Data Science', status: 'Student' },
    { id: 'USR005', name: 'David Brown', email: 'david.brown@example.com', contact: '+1 234-567-8904', interestArea: 'Mobile Development', status: 'Early Professional' },
    { id: 'USR006', name: 'Emily Davis', email: 'emily.davis@example.com', contact: '+1 234-567-8905', interestArea: 'Web Development', status: 'Job Seeker' },
    { id: 'USR007', name: 'Michael Wilson', email: 'michael.wilson@example.com', contact: '+1 234-567-8906', interestArea: 'DevOps', status: 'Early Professional' },
    { id: 'USR008', name: 'Lisa Anderson', email: 'lisa.anderson@example.com', contact: '+1 234-567-8907', interestArea: 'Product Management', status: 'Student' },
    { id: 'USR009', name: 'Robert Taylor', email: 'robert.taylor@example.com', contact: '+1 234-567-8908', interestArea: 'Machine Learning', status: 'Early Professional' },
    { id: 'USR010', name: 'Jennifer Garcia', email: 'jennifer.garcia@example.com', contact: '+1 234-567-8909', interestArea: 'Cybersecurity', status: 'Job Seeker' },
    { id: 'USR011', name: 'Christopher Martinez', email: 'christopher.martinez@example.com', contact: '+1 234-567-8910', interestArea: 'Blockchain', status: 'Student' },
    { id: 'USR012', name: 'Amanda Rodriguez', email: 'amanda.rodriguez@example.com', contact: '+1 234-567-8911', interestArea: 'Cloud Computing', status: 'Early Professional' },
    { id: 'USR013', name: 'Daniel Lee', email: 'daniel.lee@example.com', contact: '+1 234-567-8912', interestArea: 'Game Development', status: 'Student' },
    { id: 'USR014', name: 'Michelle White', email: 'michelle.white@example.com', contact: '+1 234-567-8913', interestArea: 'Digital Marketing', status: 'Job Seeker' },
    { id: 'USR015', name: 'Kevin Thompson', email: 'kevin.thompson@example.com', contact: '+1 234-567-8914', interestArea: 'Artificial Intelligence', status: 'Early Professional' },
  ];

  // Filter users based on search term
  const filteredUsers = useMemo(() => {
    return dummyUsers.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.interestArea.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handleEdit = (userId) => {
    console.log(`Editing user: ${userId}`);
    // Here you would typically open an edit modal or navigate to edit page
  };

  const handleDelete = (userId) => {
    console.log(`Deleting user: ${userId}`);
    // Here you would typically show a confirmation dialog and then delete
  };

  const handleViewProfile = (userId) => {
    console.log(`Viewing profile for user: ${userId}`);
    // Here you would typically navigate to the user's profile page
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return <PagePreloader text="Loading Users..." />;
  }

  return (
    <div className="w-full space-y-8 px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--primary-color)' }}>
          <FaUsers className="w-6 h-6" />
          Users Management
        </h1>
        <p className="text-gray-600 mt-2">Manage all registered users on the platform.</p>
      </div>

      {/* Search and Entries */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-auto">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentUsers.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=6366f1&color=fff&size=40`}
                        alt={user.name}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{user.interestArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.status}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(user.id)}
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
                        onClick={() => handleEdit(user.id)}
                        className="p-1 rounded"
                        style={{ color: 'var(--primary-color)' }}
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.id)}
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
                <span className="font-medium">{Math.min(endIndex, filteredUsers.length)}</span> of{' '}
                <span className="font-medium">{filteredUsers.length}</span> results
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

export default AdminUsers; 