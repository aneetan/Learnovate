import { motion, AnimatePresence } from "framer-motion";

const FAQSection = ({ faqs, expanded, toggleFaq }) => {
  return (
    <section className="py-28" style={{ background: 'linear-gradient(to bottom, var(--gray-50), var(--gray-100))' }}>
      <div className="container">
        <h2
          className="text-5xl font-extrabold text-center mb-16 tracking-tight"
          style={{ color: 'var(--gray-900)', fontFamily: 'var(--font-sans)' }}
        >
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {faqs.map((faq, index) => {
            const isOpen = expanded === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="transition-all duration-200 rounded-[var(--radius-lg)] shadow-sm border"
                style={{
                  borderColor: isOpen ? 'var(--primary-color)' : 'var(--gray-200)',
                  backgroundColor: 'white',
                  boxShadow: isOpen ? 'var(--shadow-md)' : 'var(--shadow-sm)',
                }}
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex justify-between items-center px-6 py-5 text-lg font-semibold transition-colors duration-200 group"
                  style={{
                    fontFamily: 'var(--font-sans)',
                    color: 'var(--gray-800)',
                    backgroundColor: 'transparent',
                  }}
                >
                  <span>{faq.question}</span>
                  <motion.span
                    className="text-2xl"
                    style={{ color: 'var(--primary-color)' }}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ type: 'tween', duration: 0.2 }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ scaleY: 0, opacity: 0 }}
                      animate={{ scaleY: 1, opacity: 1 }}
                      exit={{ scaleY: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="origin-top px-6 pb-6"
                    >
                      <p
                        className="leading-relaxed"
                        style={{
                          color: 'var(--gray-600)',
                          fontFamily: 'var(--font-sans)',
                        }}
                      >
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
