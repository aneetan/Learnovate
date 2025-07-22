import { forwardRef, useRef } from "react";
import { motion, useInView } from "framer-motion";

const HowItWorksSection = forwardRef((props, ref) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });

  const steps = [
    {
      title: "Create Your Profile",
      description: "Sign up as a mentor or apprentice and craft a standout profile highlighting your skills, experience, and aspirations.",
      icon: "M12 14l9-5-9-5-9 5 9 5z"
    },
    {
      title: "Find Your Match",
      description: "Explore our curated network of mentors and apprentices, filter by expertise, and connect with your ideal professional match.",
      icon: "M12 4v16m8-8H4"
    },
    {
      title: "Schedule Sessions",
      description: "Easily book personalized one-onwinter sessions using our seamless scheduling tool, tailored to your availability.",
      icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    },
    {
      title: "Learn & Grow",
      description: "Engage in sessions, gain tailored insights, track your progress, and fast-track your professional growth.",
      icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    },
  ];

  const cardVariants = {
    hidden: (index) => ({
      opacity: 0,
      x: index % 2 === 0 ? -100 : 100,
    }),
    visible: (index) => ({
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, delay: index * 0.2, ease: "easeOut" }
    })
  };

  const dotVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: [1, 1.2, 1],
      transition: { duration: 0.8, delay: 0.4, repeat: Infinity, repeatDelay: 2 }
    }
  };

  return (
    <section ref={sectionRef} id="how-it-works" className="py-28 bg-gradient-to-b from-[var(--gray-50)] to-[var(--gray-100)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-[var(--gray-900)] text-center mb-12"
          style={{ fontFamily: 'var(--font-sans)' }}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          How It Works
        </motion.h2>
        <div className="relative max-w-5xl mx-auto">
          <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-[var(--primary-lightest)] transform -translate-x-1/2 hidden lg:block" />
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="relative flex justify-center lg:justify-start">
                <motion.div
                  className={`relative w-full max-w-md lg:max-w-[45%] ${index % 2 === 0 ? 'lg:mr-auto lg:pr-12' : 'lg:ml-auto lg:pl-12'} flex items-center gap-4 bg-[var(--gray-50)] rounded-[var(--radius-lg)] p-6 shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)] transition-all duration-300 lg:hover:-translate-y-1 border border-[var(--gray-200)]`}
                  custom={index}
                  variants={cardVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                >
                  <div className="absolute top-1/2 -left-12 lg:left-auto lg:right-[-2.5rem] w-8 h-8 bg-[var(--primary-color)] text-white rounded-[var(--radius-full)] flex items-center justify-center text-lg font-semibold shadow-[var(--shadow-sm)] transform -translate-y-1/2 lg:translate-x-0 z-10 lg:hidden">
                    {index + 1}
                  </div>
                  <div className="w-12 h-12 bg-[var(--primary-color)] text-white rounded-[var(--radius)] flex items-center justify-center shadow-[var(--shadow-sm)] flex-shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={step.icon} />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-[var(--primary-color)] mb-2" style={{ fontFamily: 'var(--font-sans)' }}>{step.title}</h3>
                    <p className="text-[var(--gray-600)] leading-relaxed text-sm">{step.description}</p>
                  </div>
                  <motion.div
                    className={`absolute top-1/2 ${index % 2 === 0 ? 'right-[-2rem]' : 'left-[-2rem]'} w-4 h-4 bg-[var(--primary-color)] rounded-[var(--radius-full)] transform -translate-y-1/2 hidden lg:block z-10`}
                    variants={dotVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                  />
                  <div className={`absolute top-1/2 ${index % 2 === 0 ? 'right-[-1.5rem]' : 'left-[-1.5rem]'} w-6 h-0.5 bg-[var(--primary-light)] transform -translate-y-1/2 hidden lg:block`} />
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default HowItWorksSection;