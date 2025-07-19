import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaEdit, FaTrash, FaEye, FaCalendarAlt } from 'react-icons/fa';
import { PagePreloader } from '../../components/common/Preloader';
import DetailsModal from '../../components/common/DetailsModal';
import ConfirmationModal from '../../components/common/ConfirmationModal';
import EditModal from '../../components/common/EditModal';

const AdminBookings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [bookingToEdit, setBookingToEdit] = useState(null);
  const [statusSortOrder, setStatusSortOrder] = useState(null); // null, 'asc', 'desc'

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  // Dummy data for bookings
  const dummyBookings = [
    { id: 'BK001', mentor: 'Dr. Sarah Johnson', bookedBy: 'John Doe', date: '2024-01-15', time: '10:00 AM', status: 'Confirmed' },
    { id: 'BK002', mentor: 'Prof. Michael Chen', bookedBy: 'Jane Smith', date: '2024-01-16', time: '2:00 PM', status: 'Pending' },
    { id: 'BK003', mentor: 'Alex Rodriguez', bookedBy: 'Mike Johnson', date: '2024-01-17', time: '11:30 AM', status: 'Confirmed' },
    { id: 'BK004', mentor: 'Dr. Emily Davis', bookedBy: 'Sarah Wilson', date: '2024-01-18', time: '3:00 PM', status: 'Cancelled' },
    { id: 'BK005', mentor: 'James Wilson', bookedBy: 'David Brown', date: '2024-01-19', time: '9:00 AM', status: 'Confirmed' },
    { id: 'BK006', mentor: 'Lisa Anderson', bookedBy: 'Emily Davis', date: '2024-01-20', time: '1:00 PM', status: 'Pending' },
    { id: 'BK007', mentor: 'David Thompson', bookedBy: 'Michael Wilson', date: '2024-01-21', time: '4:30 PM', status: 'Confirmed' },
    { id: 'BK008', mentor: 'Maria Garcia', bookedBy: 'Lisa Anderson', date: '2024-01-22', time: '12:00 PM', status: 'Confirmed' },
    { id: 'BK009', mentor: 'Robert Taylor', bookedBy: 'Robert Taylor', date: '2024-01-23', time: '2:30 PM', status: 'Pending' },
    { id: 'BK010', mentor: 'Jennifer Brown', bookedBy: 'Jennifer Garcia', date: '2024-01-24', time: '10:30 AM', status: 'Cancelled' },
    { id: 'BK011', mentor: 'Christopher Lee', bookedBy: 'Christopher Martinez', date: '2024-01-25', time: '3:30 PM', status: 'Confirmed' },
    { id: 'BK012', mentor: 'Amanda White', bookedBy: 'Amanda Rodriguez', date: '2024-01-26', time: '11:00 AM', status: 'Confirmed' },
    { id: 'BK013', mentor: 'Daniel Martinez', bookedBy: 'Daniel Lee', date: '2024-01-27', time: '1:30 PM', status: 'Pending' },
    { id: 'BK014', mentor: 'Michelle Clark', bookedBy: 'Michelle White', date: '2024-01-28', time: '4:00 PM', status: 'Confirmed' },
    { id: 'BK015', mentor: 'Kevin Lewis', bookedBy: 'Kevin Thompson', date: '2024-01-29', time: '9:30 AM', status: 'Confirmed' },
  ];

  // Filter bookings based on search term
  const filteredBookings = useMemo(() => {
    return dummyBookings.filter(booking =>
      booking.mentor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.bookedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.status.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Sort bookings by status if statusSortOrder is set
  const sortedBookings = useMemo(() => {
    if (!statusSortOrder) return filteredBookings;
    return [...filteredBookings].sort((a, b) => {
      if (a.status < b.status) return statusSortOrder === 'asc' ? -1 : 1;
      if (a.status > b.status) return statusSortOrder === 'asc' ? 1 : -1;
      return 0;
    });
  }, [filteredBookings, statusSortOrder]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedBookings.length / entriesPerPage);
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const currentBookings = sortedBookings.slice(startIndex, endIndex);

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setShowDetailsModal(true);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleDelete = (bookingId) => {
    const booking = currentBookings.find(b => b.id === bookingId);
    setBookingToDelete(booking);
    setShowDeleteConfirm(true);
  };
  const confirmDelete = () => {
    setShowDeleteConfirm(false);
    setBookingToDelete(null);
    // Optionally: setBookings(bookings => bookings.filter(b => b.id !== bookingToDelete.id));
  };

  const handleEdit = (bookingId) => {
    const booking = currentBookings.find(b => b.id === bookingId);
    setBookingToEdit(booking);
    setShowEditModal(true);
  };
  const handleEditSave = (updatedBooking) => {
    setShowEditModal(false);
    setBookingToEdit(null);
    // Optionally: update booking in state
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-800';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return <PagePreloader text="Loading Bookings..." />;
  }

  return (
    <div className="w-full space-y-8 px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--primary-color)' }}>
          <FaCalendarAlt className="w-6 h-6" />
          Bookings Management
        </h1>
        <p className="text-gray-600 mt-2">Manage all mentorship bookings and their status.</p>
      </div>

      {/* Search and Entries */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-auto">
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search bookings..."
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentee Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mentor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer select-none" onClick={() => setStatusSortOrder(statusSortOrder === 'asc' ? 'desc' : 'asc')}>
                  Status
                  {statusSortOrder === 'asc' && <span>▲</span>}
                  {statusSortOrder === 'desc' && <span>▼</span>}
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentBookings.map((booking, index) => (
                <motion.tr
                  key={booking.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(booking.bookedBy)}&background=6366f1&color=fff&size=40`}
                        alt={booking.bookedBy}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.bookedBy}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{booking.mentor}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{booking.time}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(booking.status)}`}>
                      {booking.status}
                    </span>
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
                Showing <span className="font-medium">{startIndex + 1}</span> to <span className="font-medium">{Math.min(endIndex, sortedBookings.length)}</span> of <span className="font-medium">{sortedBookings.length}</span> results
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
      <DetailsModal
        isOpen={showDetailsModal}
        onClose={() => setShowDetailsModal(false)}
        userData={selectedBooking}
        type="booking"
      />
      <EditModal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditSave}
        data={bookingToEdit}
        type="booking"
      />
      <ConfirmationModal
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={confirmDelete}
        message={`Are you sure you want to delete this booking? This action cannot be undone.`}
      />
    </div>
  );
};

export default AdminBookings; 