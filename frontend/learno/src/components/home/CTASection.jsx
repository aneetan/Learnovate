import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CTASection = () => {
  return (
    <section
      className="py-28 text-center text-white relative overflow-hidden"
      style={{
        background: "linear-gradient(to right, var(--primary-dark), var(--primary-color))",
      }}
    >
      {/* SVG Dotted Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134...%3E")`,
          backgroundSize: "contain",
        }}
      />

      {/* Foreground Content */}
      <motion.div
        className="relative z-10 max-w-3xl mx-auto px-6"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <h2
          className="text-4xl md:text-4xl font-bold mb-6 leading-tight"
          style={{ fontFamily: "var(--font-sans)", color: "white" }}
        >
          Ready to Accelerate Your Growth?
        </h2>

        <p
          className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "var(--primary-lightest)" }}
        >
          Join Learnovate today and take the next step in your professional development journey with personalized mentorship.
        </p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/register"
            className="inline-block bg-white text-[var(--primary-dark)] px-10 py-4 rounded-[var(--radius-lg)] font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:-translate-y-1"
            style={{
              fontFamily: "var(--font-sans)",
            }}
          >
            Sign Up Now
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default CTASection;
