import React, { useState } from 'react';
import { FaTachometerAlt, FaCalendarAlt, FaVideo, FaComments, FaSearch, FaUserCircle, FaSignOutAlt, FaBars } from 'react-icons/fa';
import logoImage from "../../assets/images/learno_logo.png";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState('Dashboard');

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt /> },
    { name: 'Schedule', icon: <FaCalendarAlt /> },
    { name: 'Sessions', icon: <FaVideo /> },
    { name: 'Chat', icon: <FaComments /> },
  ];

  return (
    <div className="flex h-screen bg-[var(--gray-100)] font-sans">
      {/* Sidebar */}
      <div
        className={`flex flex-col transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'w-64' : 'w-20'
        } shadow-lg`}
        style={{
          backgroundColor: 'white',
          color: 'var(--primary-color)',
          borderRight: '1px solid var(--primary-lightest)',
        }}
      >
        {/* Logo Container */}
        <div
          className="flex items-center justify-center h-20 px-6 border-b" // Centered logo as toggle button is gone
          style={{
            borderColor: 'var(--primary-lightest)',
            backgroundColor: 'white',
          }}
        >
          <img
            src={logoImage}
            alt="Logo"
            className={`transition-all duration-300 ${
              sidebarOpen ? 'w-30' : 'w-12' // Adjusted w-25 to w-36 for better scaling with w-64
            }`}
            style={{ filter: 'none' }}
          />
          {/* Toggle button removed from here */}
        </div>

        {/* Sidebar Menu Items */}
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map(item => (
            <div
              key={item.name}
              onClick={() => setActive(item.name)}
              className={`flex items-center space-x-5 cursor-pointer px-4 py-3 rounded-[10px] transition-all duration-200
                ${
                  active === item.name
                    ? 'bg-[var(--primary-lightest)] shadow-inner'
                    : 'hover:bg-[var(--primary-lightest)]'
                }`}
              style={{ color: 'var(--primary-color)' }}
            >
              <span className="text-2xl">{item.icon}</span>
              {sidebarOpen && <span className="text-lg font-semibold">{item.name}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Navbar */}
        <div className="flex items-center justify-between bg-white p-5 shadow-md h-20" style={{ boxShadow: 'var(--shadow-md)' }}>
          {/* Sidebar Toggle Button - Now in the Navbar */}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="focus:outline-none text-[var(--primary-color)] mr-4" // Added mr-4 for spacing
            aria-label="Toggle sidebar"
          >
            <FaBars size={24} />
          </button>

          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 border border-[var(--gray-300)] rounded-[10px] pl-12 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
            />
            <FaSearch className="absolute left-4 top-4 text-[var(--gray-400)]" />
          </div>
          <div className="relative ml-8">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-3 px-4 py-3 rounded-[10px] hover:bg-[var(--gray-100)] transition-all"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              <FaUserCircle className="text-3xl text-[var(--gray-600)]" />
              <span className="hidden md:block text-lg font-semibold">Admin</span>
            </button>
            {dropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-52 bg-white rounded-[10px] shadow-lg py-3 animate-fade-in"
                style={{ boxShadow: 'var(--shadow-md)' }}
                role="menu"
                onBlur={() => setDropdownOpen(false)}
                tabIndex={-1}
              >
                <a href="#" className="block px-5 py-3 hover:bg-[var(--gray-100)] transition text-base" role="menuitem">
                  My Profile
                </a>
                <a href="#" className="block px-5 py-3 hover:bg-[var(--gray-100)] transition flex items-center space-x-3 text-base" role="menuitem">
                  <FaSignOutAlt /> <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </div>

        {/* Page Content */}
        <main className="flex-1 p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;