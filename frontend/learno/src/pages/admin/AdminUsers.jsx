import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaEye, FaUsers, FaFileAlt } from 'react-icons/fa';
import { PagePreloader } from '../../components/common/Preloader';
import DocumentModal from '../../components/common/DocumentModal';
import DetailsModal from '../../components/common/DetailsModal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import EditModal from '../../components/common/EditModal';
import axios from 'axios';
import { API_URL } from '../../config/config';

const AdminUsers = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedDetailsUser, setSelectedDetailsUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [mentee, setMentee] = useState([]);
  const token = localStorage.getItem("token");
  const [filterUser, setFilteredUser] = useState([]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMenteeData = async () => {
      try {
        // Fetch total users
        const users = await axios.get(`${API_URL}/admin/getAllMentee`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setMentee(users.data);
        setFilteredUser(users.data);
      } catch (e){
        console.log(e)
      }
    };

    fetchMenteeData();
  }, []);

   // Filter function with safe optional chaining
  const applyFilters = useMemo(() => {
    if (!searchTerm) return mentee; // Return all if no search term

    const searchLower = searchTerm.toLowerCase();
    return mentee.filter(mentee => {
      return (
        (mentee.user?.name?.toLowerCase()?.includes(searchLower)) ||
        (mentee.user?.email?.toLowerCase()?.includes(searchLower)) ||
        (mentee.area?.toLowerCase()?.includes(searchLower)) ||
        (mentee.id?.toString()?.toLowerCase()?.includes(searchLower))
      );
    });
  }, [mentee, searchTerm]);

  // Update filtered mentees when filters change
  useEffect(() => {
    setFilteredUser(applyFilters);
  }, [applyFilters]);

  // Calculate pagination
  const totalPages = Math.ceil(filterUser.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentUsers = filterUser.slice(startIndex, endIndex);

  const handleEdit = (userId) => {
    const user = currentUsers.find(u => u.id === userId);
    setUserToEdit(user);
    setShowEditModal(true);
  };
  const handleEditSave = (updatedUser) => {
    setShowEditModal(false);
    setUserToEdit(null);
    // Optionally: update user in state
  };

  const handleDelete = (userId) => {
    const user = currentUsers.find(u => u.id === userId);
    setUserToDelete(user);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = () => {
    // Remove user from dummyUsers (in real app, call API)
    setShowDeleteConfirm(false);
    setUserToDelete(null);
    // Optionally: setUsers(users => users.filter(u => u.id !== userToDelete.id));
  };

  const handleViewDocument = (user) => {
    setSelectedUser(user);
    setShowDocumentModal(true);
  };

  const handleViewDetails = (user) => {
    setSelectedDetailsUser(user);
    setShowDetailsModal(true);
  };

  const handleNameClick = (user) => {
    setSelectedDetailsUser(user);
    setShowDetailsModal(true);
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
        <div className="relative w-full sm:w-[50%]">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search users by name or area..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Area</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Status</th>
                <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filterUser.map((user, index) => (
                <motion.tr
                  key={user.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-3 py-4 whitespace-nowrap">
                    <div className='flex items-center justify-start'>
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={user.profileUrl}
                        alt={user.user.name}
                      />
                    </div>
                    <button
                      onClick={() => handleNameClick(user)}
                      className="text-blue-600 hover:text-blue-900 hover:underline cursor-pointer"
                    >
                      {user.user.name}
                    </button>
                  </div>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{user.user.email}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{user.phone}</td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-600">{user.area}</td>
                  <td className="px-3 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{user.currentStatus}</span>
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(user.user.userId)}
                        className="p-1 rounded"
                        style={{ color: 'var(--primary-color)' }}
                        title="Edit"
                      >
                        <FaEdit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(user.user.userId)}
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
        {/* Pagination Footer - moved back inside the table card */}
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 rounded-b-lg shadow-sm">
          <div className="flex-1 flex justify-between sm:hidden">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Previous
            </button>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Next
            </button>
          </div>
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, filterUser.length)}</span> of <span className="font-medium">{filterUser.length}</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
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
      </motion.div>

      {/* Copyright Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Copyright © 2025. Learnovate. All rights reserved.
        </p>
      </div>

      {/* Document Modal */}
      <DocumentModal
        isOpen={showDocumentModal}
        onClose={() => setShowDocumentModal(false)}
        userData={selectedUser}
        type="user"
      />
      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        userData={selectedDetailsUser}
        type="user"
      />
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
        data={userToEdit}
        type="user"
      />
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this user? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminUsers; 