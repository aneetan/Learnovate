import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format } from "date-fns";
import { MdDashboard } from "react-icons/md";
import PageTransition from "../../components/common/PageTransition";
import AnimatedCounter from "../../components/common/AnimatedCounter";

// 🔥 Dummy data
const dummyCurrentUser = {
  id: "mentee1",
  name: "Jane Smith",
};

const dummySessionRequests = [
  { id: "req1", mentorId: "mentor1", apprenticeId: "mentee1", status: "completed", topic: "React Basics", date: "2025-06-01", time: "10:00 AM" },
  { id: "req2", mentorId: "mentor2", apprenticeId: "mentee1", status: "pending", topic: "Java Fundamentals", date: "2025-06-05", time: "2:00 PM" },
  { id: "req3", mentorId: "mentor3", apprenticeId: "mentee1", status: "accepted", topic: "SQL Queries", date: "2025-06-07", time: "11:00 AM" },
  { id: "req4", mentorId: "mentor1", apprenticeId: "mentee1", status: "completed", topic: "React Advanced", date: "2025-06-10", time: "3:00 PM" },
];

const dummyUsers = [
  { id: "mentor1", name: "John Doe" },
  { id: "mentor2", name: "Emily Davis" },
  { id: "mentor3", name: "Michael Chen" },
];

const MenteeDashboard = () => {
  const currentUser = dummyCurrentUser;
  const sessionRequests = dummySessionRequests;
  const users = dummyUsers;

  const userRequests = (sessionRequests ?? []).filter((request) => request.apprenticeId === currentUser?.id);
  const pendingRequests = userRequests.filter((request) => request.status === "pending").length;
  const upcomingSessions = userRequests.filter((request) => request.status === "accepted");

  const stats = {
    completedSessions: userRequests.filter((request) => request.status === "completed").length,
    pendingSessions: pendingRequests,
    upcomingSessions: upcomingSessions.length,
  };

  const sessionsByStatus = [
    { name: "Completed", value: stats.completedSessions, color: "#10b981" },
    { name: "Pending", value: stats.pendingSessions, color: "#f59e0b" },
    { name: "Upcoming", value: stats.upcomingSessions, color: "#3b82f6" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50 py-6 sm:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6 sm:mb-8"
          >
            <div>
              <div className="mb-4">
                <h2
                  className="flex items-center text-xl sm:text-2xl font-semibold text-gray-700 mb-2"
                  style={{ color: "var(--primary-color)" }}
                >
                  <MdDashboard className="mr-2 w-6 h-6" style={{ color: "var(--primary-color)" }} />
                  Dashboard
                </h2>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Welcome, {currentUser.name}!</h1>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800 mt-2">
                  Mentee
                </span>
              </div>
            </div>
            <div className="text-sm text-gray-500">
              <p>{format(new Date(), "EEEE, MMMM do, yyyy")}</p>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 relative overflow-hidden hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-500"></div>
              <h3 className="text-sm font-medium text-gray-600 mb-4">Completed Sessions</h3>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                <AnimatedCounter end={stats.completedSessions} />
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 relative overflow-hidden hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-500"></div>
              <h3 className="text-sm font-medium text-gray-600 mb-4">Pending Sessions</h3>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
                <AnimatedCounter end={stats.pendingSessions} />
              </p>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 relative overflow-hidden hover:shadow-md transition-shadow"
              variants={itemVariants}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-indigo-500"></div>
              <h3 className="text-sm font-medium text-gray-600 mb-4">Upcoming Sessions</h3>
              <p className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-500 to-indigo-500 bg-clip-text text-transparent">
                <AnimatedCounter end={stats.upcomingSessions} />
              </p>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 pb-4 border-b border-gray-200">
                Session Overview
              </h2>
              <div className="h-[250px] sm:h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={sessionsByStatus}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {sessionsByStatus.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value} sessions`, "Count"]} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </motion.div>

            <motion.div
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6 pb-4 border-b border-gray-200">
                Quick Actions
              </h2>
              <div className="flex flex-col space-y-4">
                <Link
                  to="/find-mentors"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all btn-primary"
                >
                  Find Mentors
                </Link>
                <Link
                  to="/my-requests"
                  className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md font-medium text-sm shadow focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all btn-secondary"
                >
                  View My Requests
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MenteeDashboard;
