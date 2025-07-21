import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    // 1. Semantic HTML: Wrapped the section in a <main> tag.
    // This semantically indicates that this is the main content of the page.
    <main id="home">
      <section className="relative min-h-[100vh] flex items-center bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
        {/* These decorative elements don't need semantic roles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-[400px] h-[400px] bg-gradient-to-br from-teal-500 to-teal-300 rounded-full opacity-10 -top-24 -left-24 sm:w-[500px] sm:h-[500px]" aria-hidden="true" />
          <div className="absolute w-[300px] h-[300px] bg-gradient-to-br from-blue-500 to-blue-700 rounded-full opacity-10 -bottom-12 -right-12 sm:w-[400px] sm:h-[400px]" aria-hidden="true" />
          <div className="absolute w-[200px] h-[200px] bg-gradient-to-br from-purple-500 to-purple-700 rounded-full opacity-10 top-[30%] right-[15%] sm:w-[250px] sm:h-[250px]" aria-hidden="true" />
          <div className="absolute w-[150px] h-[150px] bg-gradient-to-br from-pink-500 to-pink-700 rounded-full opacity-10 bottom-[20%] left-[10%] sm:w-[200px] sm:h-[200px]" aria-hidden="true" />
        </div>

        {/* Container */}
        <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start z-10 py-[100px]">
          {/* Content */}
          <motion.div
            className="text-white order-2 lg:order-1 text-left"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="inline-flex items-center bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <span className="mr-2 text-lg" aria-hidden="true">⭐</span>
              <span className="text-sm font-medium">Trusted by 10,000+ professionals</span>
            </motion.div>

            <motion.h1
              className="text-3xl sm:text-4xl md:text-5xl lg:text-4xl font-semibold leading-tight mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* 2. Custom Primary Color: Changed to 'text-primary-color'.
                 This assumes you've configured 'primary-color' in your tailwind.config.js. */}
              Find Your Perfect <span className="text-primary-color">Mentor</span> and Accelerate Your Career
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg md:text-l text-white/80 mb-10 max-w-[90%]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Learnovate connects you with industry experts who've been where you want to go.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Link
                // 3. More Specific Link Routes: Changed to specific registration paths.
                // This offers more distinct user flows for mentors vs. mentees.
                to="/login"
                className="btn-primary px-6 py-3 rounded-lg font-small shadow-lg hover:-translate-y-1 hover:shadow-xl transition-all duration-300 text-center"
                aria-label="Find a mentor"
              >
                Find a Mentor
              </Link>

              <Link
                // 3. More Specific Link Routes: Changed to specific registration paths.
                to="/register"
                className="bg-transparent border-2 border-white/30 !text-white px-6 py-3 rounded-lg font-small hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
                aria-label="Become a Mentor"
              >
                Become a Mentor
              </Link>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row items-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-left">
                <span className="text-xl sm:text-2xl font-bold">500+</span>
                <span className="block text-sm text-white/60">Expert Mentors</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20 mx-6" />
              <div className="text-left">
                <span className="text-xl sm:text-2xl font-bold">40+</span>
                <span className="block text-sm text-white/60">Skill Categories</span>
              </div>
              <div className="hidden sm:block w-px h-8 bg-white/20 mx-6" />
              <div className="text-left">
                <span className="text-xl sm:text-2xl font-bold">95%</span>
                <span className="block text-sm text-white/60">Success Rate</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Image and Floating Cards */}
          <motion.div
            className="relative order-1 lg:order-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative rounded-2xl shadow-2xl max-w-[90%] mx-auto lg:max-w-full">
              <img
                // 4. Image Optimization: Added 'loading="eager"' (default, but explicit).
                // For a hero image, you want it to load immediately.
                // For optimal performance, you'd ideally serve a smaller image size
                // or use a service that generates responsive images.
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" // Changed width to 800 for better balance
                alt="Mentorship session in progress"
                className="w-full h-auto rounded-2xl object-cover"
                loading="eager" // Explicitly set loading strategy
              />
              <motion.div
                className="absolute bottom-4 left-4 sm:bottom-[-2rem] sm:left-[-2rem] bg-white rounded-xl p-4 flex items-center gap-3 shadow-xl max-w-[220px] sm:max-w-[250px] hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="text-2xl" aria-hidden="true">✅</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Session Completed</h4>
                  <p className="text-xs text-gray-600">Great progress on your React project!</p>
                </div>
              </motion.div>
              <motion.div
                className="absolute top-4 right-4 sm:top-8 sm:right-[-2rem] bg-white rounded-xl p-4 flex items-center gap-3 shadow-xl max-w-[220px] sm:max-w-[250px] hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <div className="text-2xl" aria-hidden="true">🚀</div>
                <div>
                  <h4 className="font-semibold text-gray-900">Goal Achieved</h4>
                  <p className="text-xs text-gray-600">Frontend Developer role at Google</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default HeroSection;