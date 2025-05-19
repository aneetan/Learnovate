import { useState } from "react";
import { motion } from "framer-motion";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rating: 0,
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRatingClick = (rating) => {
    setFormData((prev) => ({
      ...prev,
      rating,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="bg-gray-50 py-16 px-4 sm:px-6 lg:px-8" id="feedback">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-12">
        {!submitted ? (
          <>
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
                Share Your Feedback
              </h2>
              <p className="text-gray-600 text-base max-w-lg mx-auto">
                We value your input to continuously improve our mentorship platform.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">
                    How would you rate our platform?
                  </label>
                  <div className="flex space-x-3 text-5xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        aria-label={`${star} Star${star > 1 ? "s" : ""}`}
                        className={`cursor-pointer transition-colors ${
                          star <= formData.rating
                            ? "text-yellow-400"
                            : "text-gray-300 hover:text-yellow-300"
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Feedback Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    <option value="general">General Feedback</option>
                    <option value="mentors">Mentors & Matching</option>
                    <option value="ui">User Interface</option>
                    <option value="features">Feature Requests</option>
                    <option value="bug">Bug Report</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Your Feedback
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Please share your thoughts, suggestions, or experiences..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-md px-4 py-3 resize-y placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition"
                ></textarea>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-teal-600 text-white font-semibold py-3 rounded-lg shadow-md hover:bg-teal-700 transition"
                aria-label="Submit Feedback"
              >
                Submit Feedback
              </motion.button>
            </form>
          </>
        ) : (
          <div className="text-center space-y-6">
            <div className="text-6xl text-green-500">✅</div>
            <h3 className="text-2xl font-semibold text-gray-900">
              Thank You for Your Feedback!
            </h3>
            <p className="text-gray-700 max-w-xl mx-auto">
              We appreciate you taking the time to share your thoughts with us.
              Your feedback helps us improve the Learnovate platform for everyone.
            </p>
            <motion.button
              onClick={() => {
                setSubmitted(false);
                setFormData({
                  name: "",
                  email: "",
                  rating: 0,
                  category: "",
                  message: "",
                });
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-teal-600 text-white font-semibold py-3 px-8 rounded-lg shadow-md hover:bg-teal-700 transition"
            >
              Submit Another Response
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeedbackForm;
