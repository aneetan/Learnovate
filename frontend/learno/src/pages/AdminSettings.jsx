import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCog, FaLock, FaSignOutAlt, FaCheck } from 'react-icons/fa';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { PagePreloader } from '../components/common/Preloader';

const AdminSettings = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('password');
  const [passwords, setPasswords] = useState({ current: '', new: '', confirm: '' });
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (field, value) => {
    setPasswords({ ...passwords, [field]: value });
  };

  const toggleVisibility = (field) => {
    setShow({ ...show, [field]: !show[field] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setPasswords({ current: '', new: '', confirm: '' });
    setIsSubmitting(false);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
  };

  if (isLoading) {
    return <PagePreloader text="Loading Settings..." />;
  }

  const tabs = [
    { 
      id: 'password', 
      name: 'Change Password', 
      icon: <FaLock />, 
      desc: 'Secure your account'
    },
    { 
      id: 'logout', 
      name: 'Logout', 
      icon: <FaSignOutAlt />, 
      desc: 'Sign out of your account'
    },
  ];

  const renderPasswordForm = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className="space-y-6"
    >
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto flex items-center justify-center rounded-xl text-white shadow-lg mb-4 overflow-hidden"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <FaLock className="relative z-10 text-lg sm:text-xl" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
          style={{ color: 'var(--primary-color)' }}
        >
          Change Your Password
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-sm sm:text-base max-w-md mx-auto"
        >
          Keep your account secure with a strong password
        </motion.p>
      </div>

      <motion.form 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        onSubmit={handleSubmit} 
        className="space-y-5 max-w-md mx-auto"
      >
        {['current', 'new', 'confirm'].map((field, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + idx * 0.1 }}
            className="space-y-1.5"
          >
            <label htmlFor={field} className="block text-xs sm:text-sm font-medium text-gray-700 capitalize">
              {field} Password
            </label>
            <div className="relative">
              <input
                type={show[field] ? 'text' : 'password'}
                id={field}
                value={passwords[field]}
                onChange={(e) => handleChange(field, e.target.value)}
                placeholder={`Enter your ${field} password`}
                required
                className="w-full px-3 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:outline-none shadow-sm transition-all duration-300 bg-white hover:border-gray-400 text-sm"
                style={{ 
                  '--tw-ring-color': 'var(--primary-color)'
                }}
              />
              <div
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => toggleVisibility(field)}
              >
                {show[field] ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </div>
            </div>
          </motion.div>
        ))}

        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-2.5 sm:py-3 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transform transition-all duration-300 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden group mt-6"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span className="relative z-10 text-sm sm:text-base">Updating Password...</span>
            </>
          ) : (
            <>
              <FaCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 relative z-10" />
              <span className="relative z-10 text-sm sm:text-base">Update Password</span>
            </>
          )}
        </motion.button>
      </motion.form>
    </motion.div>
  );

  const renderLogout = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      exit={{ opacity: 0, y: -20 }} 
      className="flex flex-col items-center justify-center min-h-[400px] space-y-6"
    >
      <div className="text-center">
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="relative w-14 h-14 sm:w-16 sm:h-16 mx-auto flex items-center justify-center rounded-xl text-white shadow-lg mb-4 overflow-hidden"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"></div>
          <FaSignOutAlt className="relative z-10 text-lg sm:text-xl" />
        </motion.div>
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xl sm:text-2xl font-semibold text-gray-900 mb-2"
          style={{ color: 'var(--primary-color)' }}
        >
          Sign Out
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-gray-600 text-sm sm:text-base max-w-md mx-auto"
        >
          Are you sure you want to sign out of your account?
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-center space-y-3 w-full max-w-sm"
      >
        <motion.button
          onClick={handleLogout}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-full px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg text-white font-semibold text-sm sm:text-base shadow-md hover:shadow-lg transform transition-all duration-300 relative overflow-hidden group"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <FaSignOutAlt className="inline mr-2 relative z-10 w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="relative z-10">Sign Out</span>
        </motion.button>
        
        <motion.button
          onClick={() => setActiveTab('password')}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg text-gray-600 font-medium border border-gray-300 hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 text-xs sm:text-sm"
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'password':
        return renderPasswordForm();
      case 'logout':
        return renderLogout();
      default:
        return null;
    }
  };

  return (
    <div className="w-full space-y-8 px-8 pb-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-10 sm:mb-12"
      >
        <motion.div 
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}
          className="relative w-18 h-18 sm:w-20 sm:h-20 mx-auto rounded-2xl flex items-center justify-center text-white shadow-xl mb-5 sm:mb-6 overflow-hidden"
          style={{ backgroundColor: 'var(--primary-color)' }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent"></div>
          <FaCog className="relative z-10 text-xl sm:text-2xl" />
        </motion.div>
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2 sm:mb-3"
        >
          Admin Settings
        </motion.h1>
      </motion.div>

      {/* Settings Layout */}
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/3 space-y-3">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.8 }}
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              className={`w-full p-4 sm:p-5 rounded-xl text-left transition-all duration-500 flex items-center space-x-3 border-2 relative overflow-hidden group ${
                activeTab === tab.id 
                  ? 'text-white shadow-xl border-transparent' 
                  : 'bg-white/70 backdrop-blur-sm text-gray-700 hover:shadow-lg border-gray-200/50 hover:border-gray-300'
              }`}
              style={activeTab === tab.id ? { backgroundColor: 'var(--primary-color)' } : {}}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <motion.div 
                className={`text-lg sm:text-xl relative z-10 flex-shrink-0 ${activeTab === tab.id ? 'text-white' : 'text-gray-600'}`}
                whileHover={{ rotate: 5 }}
              >
                {tab.icon}
              </motion.div>
              <div className="flex-1 relative z-10 min-w-0">
                <h3 className={`font-semibold text-sm sm:text-base transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {tab.name}
                </h3>
                <p className={`text-xs sm:text-sm transition-colors duration-300 ${
                  activeTab === tab.id ? 'text-white/80' : 'text-gray-500'
                }`}>
                  {tab.desc}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 min-h-[450px] sm:min-h-[500px] relative overflow-hidden"
          >
            <div className="relative z-10">
              <AnimatePresence mode="wait">
                {renderContent()}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AdminSettings;