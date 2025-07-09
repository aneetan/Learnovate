import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaRegCalendarAlt, FaAddressBook, FaRegCommentDots, FaUserCircle, FaSignOutAlt, FaBars, FaSearch } from 'react-icons/fa';
import { MdDashboard, MdToday } from "react-icons/md";
import logoImage from "../../assets/images/learno_logo_long.png";
import logoImage2 from "../../assets/images/learno_logo_only.png";
import { getUserId } from '../../config/config';

const MentorSidebar = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const id = getUserId(localStorage.getItem("token"));

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setSidebarOpen(!isMobile);
  }, [isMobile]);

  const menuItems = [
    { name: 'Dashboard', icon: <MdDashboard />, path: '/mentor/dashboard' },
    { name: 'Availability', icon: <MdToday />, path: '/mentor/availability' },
    { name: 'Sessions', icon: <FaAddressBook />, path: `/mentor/sessions/${id}` },
    { name: 'Chat', icon: <FaRegCommentDots />, path: '/mentor/chat' },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <div
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 ease-in-out
          ${isMobile ? (sidebarOpen ? 'translate-x-0' : '-translate-x-full') : ''}
          ${!isMobile && (sidebarOpen ? 'w-64' : 'w-20')}
        `}
        style={{ borderColor: 'var(--primary-lightest, #e0e7ff)' }}
      >
        <div className="flex items-center justify-center h-20 border-b" style={{ borderColor: 'var(--primary-lightest, #e0e7ff)' }}>
          <img
            src={(sidebarOpen || isMobile) ? logoImage : logoImage2}
            alt="Logo"
            className={`transition-all duration-300 object-contain ${(sidebarOpen || isMobile) ? 'w-40' : 'w-12'}`}
          />
        </div>
        <nav className="flex-1 p-4 space-y-3">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <div
                key={item.name}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) setSidebarOpen(false);
                }}
                className={`
                  flex items-center space-x-4 cursor-pointer px-3 py-2 rounded-lg transition-all duration-200 group
                  ${isActive
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'hover:bg-[var(--primary-lightest)] hover:text-[var(--primary-color)]'
                  }
                `}
              >
                <span
                  className="text-xl"
                  style={{ color: isActive ? 'white' : 'var(--primary-color)' }}
                >
                  {item.icon}
                </span>
                {(sidebarOpen || isMobile) && (
                  <span
                    className={`text-base font-semibold ${isActive ? 'text-white' : 'text-[var(--gray-700)] group-hover:text-[var(--primary-color)]'}`}
                  >
                    {item.name}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black opacity-30 z-40"
        />
      )}

      <div
        className={`
          flex-1 flex flex-col transition-all duration-300 ease-in-out
          ${!isMobile && (sidebarOpen ? 'md:ml-64' : 'md:ml-20')}
          ${isMobile ? 'ml-0' : ''}
        `}
      >
        <header
          className="fixed top-0 left-0 right-0 h-20 bg-white shadow z-30 flex items-center px-4 transition-all duration-300"
          style={{
            paddingLeft: isMobile ? '1rem' : sidebarOpen ? '16rem' : '5rem',
            borderBottom: '1px solid var(--primary-lightest, #e0e7ff)',
          }}
        >
          <div className="flex items-center space-x-4 flex-1">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="focus:outline-none rounded-md border p-1"
              style={{ borderColor: 'var(--primary-color)', color: 'var(--primary-color)' }}
            >
              <FaBars size={24} />
            </button>
            <div className="relative w-full max-w-sm">
              <input
                type="text"
                placeholder="Search..."
                className="w-full p-3 border border-gray-300 rounded-[10px] pl-10 text-base focus:outline-none focus:ring-2 focus:ring-[var(--primary-light)] focus:border-transparent"
              />
              <FaSearch className="absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          <div className="relative ml-4">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              <FaUserCircle className="text-2xl text-gray-600" />
              <span className="hidden md:block text-base font-semibold">Mentor</span>
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50">
                 <button
                  onClick={() => {
                    navigate('/mentor/profile');
                    setDropdownOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 transition text-sm"
                >
                  My Profile
                </button>
                 <a href="#" className="block px-4 py-2 hover:bg-gray-100 transition flex items-center space-x-2 text-sm">
                  <FaSignOutAlt /> <span>Logout</span>
                </a>
              </div>
            )}
          </div>
        </header>

        <main className="pt-24 p-4 overflow-auto flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MentorSidebar;
