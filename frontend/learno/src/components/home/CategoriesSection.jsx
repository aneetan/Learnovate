import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";

const CategoriesSection = forwardRef(
  ({ inView, categories, activeCategory, setActiveCategory }, ref) => {
    const toggleCategory = (id) => {
      setActiveCategory(activeCategory === id ? null : id);
    };

    return (
      <section ref={ref} id="categories" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <motion.h2
            className="text-4xl font-bold text-center text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Explore Mentor Categories
          </motion.h2>

          <motion.p
            className="text-lg text-gray-600 text-center max-w-2xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Find expert mentors across a wide range of professional fields and specialties.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 cursor-default hover:-translate-y-1.5 hover:shadow-md transition-transform duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
              >
                <div className="relative h-48 overflow-hidden rounded-t-xl">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute top-4 right-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-lg text-primary shadow">
                    {category.icon}
                  </div>
                </div>

                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>

                  <div className="flex flex-wrap gap-2 mb-5">
                    {category.skills.slice(0, 3).map((skill, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {category.skills.length > 3 && (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                        +{category.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <Link
                      to="/mentors"
                      className="btn btn-primary"
                      role="button"
                    >
                      Browse Mentors
                    </Link>
                    <button
                      onClick={() => toggleCategory(category.id)}
                      className="btn-minimal flex items-center gap-2 focus:outline-none"
                      aria-expanded={activeCategory === category.id}
                      aria-controls={`category-details-${category.id}`}
                    >
                      <span>{activeCategory === category.id ? "Less Info" : "More Info"}</span>
                      <span className="font-bold">{activeCategory === category.id ? "−" : "+"}</span>
                    </button>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {activeCategory === category.id && (
                    <motion.div
                      id={`category-details-${category.id}`}
                      className="p-6 border-t border-gray-200 text-left"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h4 className="text-base font-semibold text-gray-800 mb-3">
                        Popular Skills
                      </h4>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {category.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                      <Link
                        to="/mentors"
                        className="btn btn-primary"
                        role="button"
                      >
                        Find {category.name} Mentors
                      </Link>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/mentors"
              className="btn btn-primary btn-lg"
              role="button"
            >
              Explore All Categories
            </Link>
          </div>
        </div>
      </section>
    );
  }
);

export default CategoriesSection;