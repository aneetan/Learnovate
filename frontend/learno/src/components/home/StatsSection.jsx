import { forwardRef } from "react";
import { motion } from "framer-motion";
import AnimatedCounter from "../common/AnimatedCounter";

const stats = [
  { end: 500, suffix: "+", label: "Active Mentors" },
  { end: 10000, suffix: "+", label: "Mentorship Sessions" },
  { end: 95, suffix: "%", label: "Satisfaction Rate" },
  { end: 40, suffix: "+", label: "Skill Categories" },
];

const StatsSection = forwardRef(({ inView }, ref) => {
  return (
    <section ref={ref} className="py-24 bg-[var(--gray-50)]">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white border border-[var(--gray-200)] rounded-[var(--radius-lg)] p-10 text-center shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-md)] hover:-translate-y-2 transition-all duration-300 group"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.15 }}
            >
              <div
                className="text-4xl font-extrabold bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-light)] bg-clip-text text-transparent mb-2 transition-colors duration-300"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                <AnimatedCounter end={stat.end} suffix={stat.suffix} />
              </div>
              <div
                className="text-lg text-[var(--primary-dark)] font-medium opacity-90"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default StatsSection;
