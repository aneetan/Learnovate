import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";
import logoImage from "../../assets/images/learno_logo_long.png";

const HomeFooter = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Home", href: "#home" },
      { name: "Features", href: "#features" },
      { name: "Categories", href: "#categories" },
      { name: "How It Works", href: "#how-it-works" },
      { name: "Testimonials", href: "#testimonials" },
      { name: "FAQ", href: "#faq" },
    ],
    support: [
      { name: "Help Center", href: "#faq" },
      { name: "Contact Us", href: "#contact" },
    ],
    company: [
      { name: "About Us", href: "#about" },
      { name: "Careers", href: "#careers" },
      { name: "Blog", href: "#blog" },
      { name: "Press", href: "#press" },
    ],
  };

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const socialLinks = [
    { name: "Twitter", href: "#", icon: <FaTwitter className="w-5 h-5" /> },
    { name: "LinkedIn", href: "#", icon: <FaLinkedin className="w-5 h-5" /> },
    { name: "GitHub", href: "#", icon: <FaGithub className="w-5 h-5" /> },
    { name: "Instagram", href: "#", icon: <FaInstagram className="w-5 h-5" /> },
  ];

  return (
    <footer
      className="bg-white border-t"
      style={{
        borderColor: "var(--gray-200)",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2">
              <img
                src={logoImage}
                alt="Learnovate Logo"
                className="h-30 w-auto"
              />
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-md"
              style={{ color: "var(--gray-600)" }}
            >
              Connecting mentors and apprentices to accelerate learning and
              career growth. Join our community of learners and experts.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.name}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 rounded-full transition-colors duration-200"
                  style={{
                    backgroundColor: "var(--gray-100)",
                    color: "var(--gray-600)",
                  }}
                  aria-label={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--gray-900)" }}
            >
              Quick Links
            </h3>
            <ul className="space-y-3">
              {footerLinks.platform.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(link.href);
                    }}
                    className="text-sm transition-colors duration-200 hover:scale-105"
                    style={{ color: "var(--gray-600)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--gray-900)" }}
            >
              Support
            </h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors duration-200 hover:scale-105"
                    style={{ color: "var(--gray-600)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{ color: "var(--gray-900)" }}
            >
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-sm transition-colors duration-200 hover:scale-105"
                    style={{ color: "var(--gray-600)" }}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          className="mt-12 pt-8 border-t text-center"
          style={{ borderColor: "var(--gray-200)" }}
        >
          <p className="text-sm" style={{ color: "var(--gray-500)" }}>
            © {currentYear} Learnovate. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default HomeFooter;
