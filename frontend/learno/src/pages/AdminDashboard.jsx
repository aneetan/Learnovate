import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MdDashboard, MdPeople, MdAttachMoney } from 'react-icons/md';
import { PagePreloader } from '../components/common/Preloader';

const AdminDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [requests, setRequests] = useState([
    {
      id: 'REQ001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      contact: '+1 234-567-8900',
      interestArea: 'React Development',
      status: 'pending'
    },
    {
      id: 'REQ002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      contact: '+1 234-567-8901',
      interestArea: 'UI/UX Design',
      status: 'pending'
    },
    {
      id: 'REQ003',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      contact: '+1 234-567-8902',
      interestArea: 'Python Programming',
      status: 'pending'
    },
    {
      id: 'REQ004',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      contact: '+1 234-567-8903',
      interestArea: 'Data Science',
      status: 'pending'
    },
    {
      id: 'REQ005',
      name: 'David Brown',
      email: 'david.brown@example.com',
      contact: '+1 234-567-8904',
      interestArea: 'Mobile Development',
      status: 'pending'
    }
  ]);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const stats = [
    {
      title: 'Total Users',
      value: '2,847',
      change: '+12%',
      changeType: 'positive',
      icon: (
        <MdPeople className="w-6 h-6" />
      )
    },
    {
      title: 'Registered Mentors',
      value: '156',
      change: '+8%',
      changeType: 'positive',
      icon: (
        <MdPeople className="w-6 h-6" />
      )
    },
    {
      title: 'Transactions',
      value: '$45,231',
      change: '+23%',
      changeType: 'positive',
      icon: (
        <MdAttachMoney className="w-6 h-6" />
      )
    }
  ];

  const handleApprove = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // Here you would typically make an API call to approve the request
    console.log(`Approved request: ${id}`);
  };

  const handleDelete = (id) => {
    setRequests(requests.filter(req => req.id !== id));
    // Here you would typically make an API call to delete the request
    console.log(`Deleted request: ${id}`);
  };

  const handleViewProfile = (id) => {
    // Here you would typically navigate to the user's profile page
    console.log(`Viewing profile for: ${id}`);
  };

  if (isLoading) {
    return <PagePreloader text="Loading Dashboard..." />;
  }

  return (
    <div className="w-full space-y-8 px-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: 'var(--primary-color)' }}>
          <MdDashboard className="w-8 h-8" />
          Admin Dashboard
        </h1>
        <p className="text-gray-600 mt-2">Welcome back! Here's what's happening with your platform.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <p className={`text-sm mt-1 ${stat.changeType === 'positive' ? '' : 'text-red-600'}`} style={{ color: stat.changeType === 'positive' ? 'var(--primary-color)' : undefined }}>
                  {stat.change} from last month
                </p>
              </div>
              <div className="p-3 rounded-full" style={{ backgroundColor: 'var(--primary-lightest)', color: 'var(--primary-color)' }}>
                {stat.icon}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Requests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
      >
        <div className="pb-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Recent Requests for Mentorship</h2>
        </div>
        <div className="overflow-x-auto w-full">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile Picture</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Interest Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {requests.map((request, index) => (
                <motion.tr
                  key={request.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex-shrink-0 h-10 w-10">
                      <img
                        className="h-10 w-10 rounded-full object-cover"
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(request.name)}&background=6366f1&color=fff&size=40`}
                        alt={request.name}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.contact}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{request.interestArea}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleViewProfile(request.id)}
                      className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                    >
                      View Profile
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="text-white px-3 py-1 rounded-md text-xs transition-colors"
                        style={{ backgroundColor: 'var(--primary-color)' }}
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleDelete(request.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded-md text-xs hover:bg-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Copyright Footer */}
      <div className="text-center py-8 border-t border-gray-200">
        <p className="text-sm text-gray-500">
          Copyright © 2025. Learnovate. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard; 