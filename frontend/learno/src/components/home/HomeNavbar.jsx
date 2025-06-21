import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "../../assets/images/learno_logo_only.png";

const HomeNavbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthDropdownOpen, setIsAuthDropdownOpen] = useState(false);

  const navItems = [
    { name: "Home", href: "#home" },
    { name: "Features", href: "#features" },
    { name: "Categories", href: "#categories" },
    { name: "How It Works", href: "#how-it-works" },
    { name: "Testimonials", href: "#testimonials" },
    { name: "FAQ", href: "#faq" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isAuthDropdownOpen && !event.target.closest('.auth-dropdown')) {
        setIsAuthDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isAuthDropdownOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-lg border-b"
      style={{
        fontFamily: "var(--font-sans)",
        borderColor: "var(--gray-200)",
      }}
    >
      <div className="container">
        <div className="flex justify-between items-center h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <img
              src={logoImage}
              alt="Learnovate Logo"
              className="h-8 w-auto lg:h-20 transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 hover:scale-105 relative group"
                style={{ color: "var(--gray-700)" }}
                whileHover={{ y: -2 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {item.name}
                <span
                  className="absolute bottom-0 left-1/2 w-0 h-0.5 transition-all duration-300 group-hover:w-full group-hover:left-0"
                  style={{ backgroundColor: "var(--primary-color)" }}
                />
              </motion.button>
            ))}
          </div>

          {/* Desktop Auth Button */}
          <div className="hidden lg:block relative auth-dropdown">
            <motion.button
              onClick={() => setIsAuthDropdownOpen(!isAuthDropdownOpen)}
              className="px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 flex items-center space-x-2"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                boxShadow: "var(--shadow-md)",
              }}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Get Started</span>
              <svg
                className={`w-4 h-4 transition-transform duration-200 ${
                  isAuthDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.button>

            <AnimatePresence>
              {isAuthDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border"
                  style={{ borderColor: "var(--gray-200)" }}
                >
                  <div className="py-2">
                    <Link
                      to="/login"
                      className="block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                      style={{ color: "var(--gray-700)" }}
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/register"
                      className="block px-4 py-3 text-sm font-medium transition-colors duration-200 hover:bg-gray-50"
                      style={{ color: "var(--gray-700)" }}
                      onClick={() => setIsAuthDropdownOpen(false)}
                    >
                      Create Account
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg transition-colors duration-200"
              style={{
                color: "var(--gray-700)",
                backgroundColor: "var(--gray-100)",
              }}
              aria-label="Toggle mobile menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t"
              style={{ borderColor: "var(--gray-200)" }}
            >
              <div className="px-4 py-6 space-y-4">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200"
                    style={{
                      color: "var(--gray-700)",
                      backgroundColor: "var(--gray-50)",
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 10 }}
                  >
                    {item.name}
                  </motion.button>
                ))}
                <div
                  className="pt-4 border-t"
                  style={{ borderColor: "var(--gray-200)" }}
                >
                  <Link
                    to="/login"
                    className="block w-full text-left text-sm font-medium py-3 px-4 rounded-lg transition-all duration-200 mb-2"
                    style={{
                      color: "var(--gray-700)",
                      backgroundColor: "var(--gray-50)",
                    }}
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/register"
                    className="block w-full px-4 py-3 text-sm font-medium rounded-lg text-center transition-all duration-200"
                    style={{
                      backgroundColor: "var(--primary-color)",
                      color: "white",
                      boxShadow: "var(--shadow-md)",
                    }}
                  >
                    Create Account
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default HomeNavbar;
