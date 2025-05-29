import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCalendarAlt, FaVideo, FaComments, FaUserCircle, FaSignOutAlt, FaBars, FaSearch } from 'react-icons/fa';
import logoImage from "../../assets/images/learno_logo_long.png";
import logoImage2 from "../../assets/images/learno_logo_only.png";

const MentorLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Dashboard', icon: <FaTachometerAlt />, path: '/dashboard' },
    { name: 'Schedule', icon: <FaCalendarAlt />, path: '/schedule' },
    { name: 'Sessions', icon: <FaVideo />, path: '/sessions' },
    { name: 'Chat', icon: <FaComments />, path: '/chat' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-40 transition-all duration-300 ease-in-out ${sidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-center h-20 border-b" style={{ borderColor: 'var(--primary-lightest)' }}>
          <img src={sidebarOpen ? logoImage : logoImage2} alt="Logo" className={`transition-all duration-300 object-contain ${sidebarOpen ? 'w-40' : 'w-12'}`} />
        </div>
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map((item) => (
            <div key={item.name}
              onClick={() => navigate(item.path)}
              className="flex items-center space-x-4 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 hover:bg-[var(--primary-lightest)]"
              style={{ color: 'var(--primary-color)' }}>
              <span className="text-xl">{item.icon}</span>
              {sidebarOpen && <span className="text-base font-semibold">{item.name}</span>}
            </div>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 h-20 bg-white shadow z-30 flex items-center justify-between px-4 transition-all duration-300" style={{ paddingLeft: sidebarOpen ? '16rem' : '5rem', borderBottom: '1px solid var(--primary-lightest)' }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="focus:outline-none rounded-md border p-1 mr-4" style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}>
            <FaBars size={24} />
          </button>
          {/* Search Bar */}
          <div className="relative w-full max-w-lg">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-3 border border-gray-300 rounded-[10px] pl-10 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
            />
            <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
          </div>
          {/* User Dropdown */}
          <div className="relative ml-4">
            <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition">
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="hidden md:block text-base font-semibold">Mentor</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition text-sm">My Profile</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition flex items-center space-x-2 text-sm">
                  <FaSignOutAlt /> <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </header>

        {/* Main Content Area */}
        <main className="pt-24 p-4 overflow-auto flex-1">
          <Outlet /> {/* Child routes will be rendered here */}
        </main>
      </div>
    </div>
  );
};

export default MentorLayout;
