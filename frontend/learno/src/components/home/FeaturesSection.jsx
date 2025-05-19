import { forwardRef } from "react";
import { motion } from "framer-motion";

const features = [
  {
    title: "Personalized Matching",
    description:
      "Our intelligent algorithm connects you with mentors who match your specific goals, learning style, and career aspirations.",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Flexible Scheduling",
    description:
      "Book sessions that fit your calendar with our easy-to-use scheduling system. Learn at your own pace and on your own time.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  },
  {
    title: "Progress Tracking",
    description:
      "Monitor your growth with detailed progress reports, skill assessments, and milestone tracking to celebrate your achievements.",
    image:
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1740&q=80",
  },
];

const FeaturesSection = forwardRef(({ inView }, ref) => {
  return (
    <section ref={ref} className="py-24 bg-[var(--gray-50)]">
      <div className="container mx-auto px-6">
        <motion.h2
          className="text-4xl font-bold text-center text-[var(--gray-900)] mb-14"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          style={{ fontFamily: "var(--font-sans)" }}
        >
          Why Choose Learnovate
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="relative group bg-white border border-[var(--gray-200)] rounded-[var(--radius-lg)] p-8 text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-2 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + index * 0.1 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-light)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="w-24 h-24 mx-auto mb-6 rounded-full overflow-hidden shadow-lg border-4 border-[var(--primary-lighter)]">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover scale-105 transition-transform duration-300 group-hover:scale-110"
                />
              </div>

              <h3 className="text-xl font-semibold text-[var(--primary-dark)] mb-4" style={{ fontFamily: "var(--font-sans)" }}>
                {feature.title}
              </h3>
              <p className="text-[var(--gray-600)] leading-relaxed text-base">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default FeaturesSection;
