import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaCheck, FaClock, FaUser, FaCalendar, FaAddressBook, FaCommentDots } from 'react-icons/fa';

const MentorSessions = () => {
  const [sessions, setSessions] = useState([
    {
      id: 'SES001',
      sessionName: 'React Fundamentals',
      description: 'Learn the basics of React including components, props, state, and hooks. Perfect for beginners starting their React journey.',
      menteeName: 'Alice Johnson',
      menteeEmail: 'alice.johnson@example.com',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'upcoming',
    },
    {
      id: 'SES002',
      sessionName: 'Advanced JavaScript Concepts',
      description: 'Deep dive into advanced JavaScript concepts like closures, promises, async/await, and functional programming patterns.',
      menteeName: 'Bob Smith',
      menteeEmail: 'bob.smith@example.com',
      date: '2024-01-16',
      time: '2:00 PM',
      status: 'completed'
    },
    {
      id: 'SES003',
      sessionName: 'UI/UX Design Principles',
      description: 'Explore fundamental design principles, user research methods, and prototyping techniques for creating user-centered designs.',
      menteeName: 'Carol Davis',
      menteeEmail: 'carol.davis@example.com',
      date: '2024-01-17',
      time: '11:30 AM',
      status: 'upcoming'
    },
    {
      id: 'SES004',
      sessionName: 'Python Data Analysis',
      description: 'Introduction to data analysis with Python using pandas, numpy, and matplotlib. Learn to clean, analyze, and visualize data.',
      menteeName: 'David Wilson',
      menteeEmail: 'david.wilson@example.com',
      date: '2024-01-18',
      time: '3:00 PM',
      status: 'upcoming'
    },
    {
      id: 'SES005',
      sessionName: 'Mobile App Development',
      description: 'Build your first mobile app using React Native. Cover navigation, state management, and deploying to app stores.',
      menteeName: 'Emma Brown',
      menteeEmail: 'emma.brown@example.com',
      date: '2024-01-19',
      time: '9:00 AM',
      status: 'completed',    },
    {
      id: 'SES006',
      sessionName: 'DevOps Best Practices',
      description: 'Learn CI/CD pipelines, containerization with Docker, and cloud deployment strategies for modern applications.',
      menteeName: 'Frank Miller',
      menteeEmail: 'frank.miller@example.com',
      date: '2024-01-20',
      time: '1:00 PM',
      status: 'upcoming'
    }
  ]);

  const [filterStatus, setFilterStatus] = useState('all');

  const handleMarkComplete = (sessionId) => {
    setSessions(sessions.map(session => 
      session.id === sessionId 
        ? { ...session, status: 'completed' }
        : session
    ));
  };

  const handleMessage = (menteeEmail) => {
    // Here you would typically open a chat or navigate to messaging
    console.log(`Opening chat with ${menteeEmail}`);
  };

  const filteredSessions = filterStatus === 'all' 
    ? sessions 
    : sessions.filter(session => session.status === filterStatus);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'upcoming':
        return 'bg-[var(--primary-lightest)] text-[var(--primary-color)]';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'upcoming':
        return 'Upcoming';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className="w-full space-y-8 px-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-3" style={{ color: 'var(--primary-color)' }}>
          <FaAddressBook className="w-6 h-6" />
          Sessions
        </h1>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'all'
                ? ''
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterStatus === 'all' ? { backgroundColor: 'var(--primary-color)', color: 'white' } : {}}
          >
            All Sessions ({sessions.length})
          </button>
          <button
            onClick={() => setFilterStatus('upcoming')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'upcoming'
                ? ''
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterStatus === 'upcoming' ? { backgroundColor: 'var(--primary-color)', color: 'white' } : {}}
          >
            Upcoming ({sessions.filter(s => s.status === 'upcoming').length})
          </button>
          <button
            onClick={() => setFilterStatus('completed')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filterStatus === 'completed'
                ? ''
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            style={filterStatus === 'completed' ? { backgroundColor: 'var(--primary-color)', color: 'white' } : {}}
          >
            Completed ({sessions.filter(s => s.status === 'completed').length})
          </button>
        </div>
      </div>

      {/* Sessions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSessions.map((session, index) => (
          <motion.div
            key={session.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            {/* Session Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.sessionName}</h3>
                <p className="text-sm text-gray-600 mb-2">{session.topic}</p>
                <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(session.status)}`}>
                  {getStatusText(session.status)}
                </span>
              </div>
            </div>

            {/* Session Description */}
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{session.description}</p>

            {/* Session Details */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <FaUser className="w-4 h-4 mr-2 text-gray-400" />
                <span className="font-medium">{session.menteeName}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <FaCalendar className="w-4 h-4 mr-2 text-gray-400" />
                <span>{session.date} at {session.time}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => handleMessage(session.menteeEmail)}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                style={{ backgroundColor: 'var(--primary-color)', color: 'white' }}
              >
                <FaCommentDots className="w-4 h-4" />
                Message
              </button>
              {session.status === 'upcoming' && (
                <button
                  onClick={() => handleMarkComplete(session.id)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                >
                  <FaCheck className="w-4 h-4" />
                  Mark Complete
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredSessions.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <FaCalendar className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No sessions found</h3>
          <p className="text-gray-600">
            {filterStatus === 'all' 
              ? "You don't have any sessions yet."
              : `No ${filterStatus} sessions found.`
            }
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default MentorSessions; 