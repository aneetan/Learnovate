import { motion } from "framer-motion";

const TestimonialsSection = ({ testimonials, activeTestimonial, setActiveTestimonial }) => {
  return (
    <section id="testimonials" className="py-28 bg-[var(--gray-50)] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22%23CBD5E1%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%226%22%20cy%3D%226%22%20r%3D%222%22%2F%3E%3Ccircle%20cx%3D%2236%22%20cy%3D%226%22%20r%3D%222%22%2F%3E%3Ccircle%20cx%3D%226%22%20cy%3D%2236%22%20r%3D%222%22%2F%3E%3Ccircle%20cx%3D%2236%22%20cy%3D%2236%22%20r%3D%222%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50 z-0" />
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--primary-lighter)]/10 to-[var(--primary-light)]/10 z-0" />
      <div className="container mx-auto px-6 relative z-10">
        <h2 className="text-4xl font-bold text-[var(--gray-900)] text-center mb-16 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[var(--primary-color)] to-[var(--primary-dark)]">
          Success Stories
        </h2>
        <div className="relative max-w-4xl mx-auto h-[450px] md:h-[400px] overflow-hidden">
          <div className="relative h-full">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                className={`absolute top-0 left-0 w-full bg-white rounded-[var(--radius-lg)] shadow-[var(--shadow-lg)] p-10 border border-[var(--gray-200)] transition-all duration-300 hover:shadow-[var(--shadow-md)] ${
                  index === activeTestimonial ? "opacity-100 pointer-events-auto z-10" : "opacity-0 pointer-events-none z-0"
                }`}
                initial={{ opacity: 0, scale: 0.95, x: "100%" }}
                animate={{
                  opacity: index === activeTestimonial ? 1 : 0,
                  scale: index === activeTestimonial ? 1 : 0.95,
                  x: index === activeTestimonial ? "0%" : index > activeTestimonial ? "100%" : "-100%",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div className="relative mb-8">
                  <div className="absolute -top-8 -left-4 text-8xl text-[var(--primary-light)]/30 font-serif z-20">“</div>
                  <p className="text-lg text-[var(--gray-600)] italic leading-relaxed relative z-10 font-[var(--font-sans)]">
                    {testimonial.quote}
                  </p>
                  <div className="absolute -bottom-16 -right-4 text-8xl text-[var(--primary-light)]/30 font-serif z-20">”</div>
                </div>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-[var(--radius-full)] mr-4 object-cover border-2 border-[var(--primary-lighter)] transition-transform duration-300 hover:scale-110"
                  />
                  <div>
                    <h4 className="text-xl font-semibold text-[var(--gray-900)] font-[var(--font-sans)]">{testimonial.name}</h4>
                    <p className="text-sm text-[var(--gray-500)] font-[var(--font-sans)]">{testimonial.role} at {testimonial.company}</p>
                  </div>
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      className={`w-5 h-5 rounded-[var(--radius-full)] shadow-[var(--shadow-sm)] transition-all duration-300 transform hover:scale-125 ${
                        idx === activeTestimonial ? "bg-[var(--primary-color)] scale-125" : "bg-[var(--gray-300)]"
                      }`}
                      onClick={() => setActiveTestimonial(idx)}
                      aria-label={`Go to testimonial ${idx + 1}`}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full overflow-hidden z-0">
        <svg
          className="w-full h-24 text-[var(--gray-100)]"
          viewBox="0 0 1440 100"
          fill="currentColor"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C280,100 720,100 1440,0 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
};

export default TestimonialsSection;