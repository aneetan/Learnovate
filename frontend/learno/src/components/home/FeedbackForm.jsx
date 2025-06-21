import { useState, useCallback } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});
  const [focusedField, setFocusedField] = useState(null);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: null }));
  }, []);

  const handleRatingClick = useCallback((rating) => {
    setFormData((prev) => ({ ...prev, rating }));
    setValidationErrors((prev) => ({ ...prev, rating: null }));
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Your name is required.";
    if (!formData.email.trim()) {
      errors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Please enter a valid email address.";
    }
    if (formData.rating === 0) errors.rating = "Please select a rating.";
    if (!formData.category) errors.category = "Please select a feedback category.";
    if (!formData.message.trim()) {
      errors.message = "Your feedback message cannot be empty.";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Please provide a more detailed message (min 10 characters).";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm() || isLoading) return;
    setIsLoading(true);
    setSubmitError(null);

    try {
      const response = await new Promise((resolve) =>
        setTimeout(() => {
          const success = Math.random() > 0.1;
          resolve(success ? { ok: true } : { ok: false, status: 500, statusText: "Internal Server Error" });
        }, 1500)
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
      }

      setSubmitted(true);
      setFormData({ name: "", email: "", rating: 0, category: "", message: "" });
    } catch (error) {
      setSubmitError(`Failed to submit feedback: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    setSubmitted(false);
    setSubmitError(null);
    setValidationErrors({});
    setFormData({ name: "", email: "", rating: 0, category: "", message: "" });
  }, []);

  return (
    <section
      className="py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: "var(--gray-50)", fontFamily: "var(--font-sans)" }}
    >
      <div
        className="max-w-3xl mx-auto p-8 sm:p-12"
        style={{
          backgroundColor: "white",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <div aria-live="polite" className="sr-only">
          {isLoading && "Submitting feedback..."}
          {submitError && `Error: ${submitError}`}
          {submitted && "Feedback submitted successfully"}
        </div>

        {!submitted ? (
          <>
            <div className="mb-10 text-center">
              <h2
                className="text-3xl font-extrabold mb-2"
                style={{ color: "var(--gray-900)" }}
              >
                Share Your Feedback
              </h2>
              <p
                className="text-base max-w-lg mx-auto"
                style={{ color: "var(--gray-600)" }}
              >
                We value your input to improve our mentorship platform.
              </p>
              {submitError && (
                <p className="text-red-600 mt-4 text-sm font-medium" role="alert">
                  {submitError}
                </p>
              )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-8" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["name", "email"].map((field) => (
                  <div key={field}>
                    <label
                      htmlFor={field}
                      className="block font-medium mb-2"
                      style={{ color: "var(--gray-700)" }}
                    >
                      {field === "name" ? "Your Name" : "Email Address"}
                      <span className="text-red-600" aria-hidden="true">*</span>
                    </label>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      required
                      placeholder={`Enter your ${field}`}
                      value={formData[field]}
                      onChange={handleChange}
                      onFocus={() => setFocusedField(field)}
                      onBlur={() => setFocusedField(null)}
                      className="w-full px-4 py-2 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 transition border"
                      style={{
                        borderColor: "var(--gray-300)",
                        backgroundColor: "white",
                        focusRingColor: "var(--primary-lightest)",
                      }}
                      aria-invalid={!!validationErrors[field]}
                      aria-describedby={validationErrors[field] ? `${field}-error` : undefined}
                    />
                    {validationErrors[field] && (
                      <p id={`${field}-error`} className="mt-1 text-sm text-red-600" role="alert">
                        {validationErrors[field]}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                <div>
                  <label
                    className="block font-medium mb-2"
                    style={{ color: "var(--gray-700)" }}
                  >
                    Platform Rating
                    <span className="text-red-600" aria-hidden="true">*</span>
                  </label>
                  <div className="flex space-x-3" role="radiogroup" aria-labelledby="rating-label">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <motion.button
                        key={star}
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleRatingClick(star)}
                        aria-label={`${star} star${star > 1 ? "s" : ""}`}
                        role="radio"
                        aria-checked={formData.rating === star}
                        className="cursor-pointer"
                      >
                        <span
                          style={{
                            fontSize: "1.5rem",
                            color: star <= formData.rating ? "var(--primary-lighter)" : "var(--gray-300)",
                          }}
                        >
                          ★
                        </span>
                      </motion.button>
                    ))}
                  </div>
                  {validationErrors.rating && (
                    <p className="mt-1 text-sm text-red-600" role="alert">
                      {validationErrors.rating}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block font-medium mb-2"
                    style={{ color: "var(--gray-700)" }}
                  >
                    Feedback Category
                    <span className="text-red-600" aria-hidden="true">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-md focus:outline-none focus:ring-2 transition border"
                    style={{
                      borderColor: "var(--gray-300)",
                      backgroundColor: "white",
                      focusRingColor: "var(--primary-lightest)",
                    }}
                    aria-describedby={validationErrors.category ? "category-error" : undefined}
                  >
                    <option value="" disabled>
                      Select a category
                    </option>
                    {[
                      { value: "general", label: "General Feedback" },
                      { value: "mentors", label: "Mentors & Matching" },
                      { value: "ui", label: "User Interface" },
                      { value: "features", label: "Feature Requests" },
                      { value: "bug", label: "Bug Report" },
                    ].map(({ value, label }) => (
                      <option key={value} value={value}>{label}</option>
                    ))}
                  </select>
                  {validationErrors.category && (
                    <p id="category-error" className="mt-1 text-sm text-red-600" role="alert">
                      {validationErrors.category}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block font-medium mb-2"
                  style={{ color: "var(--gray-700)" }}
                >
                  Your Feedback
                  <span className="text-red-600" aria-hidden="true">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Please share your thoughts..."
                  value={formData.message}
                  onChange={handleChange}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-md resize-y focus:outline-none focus:ring-2 transition border"
                  style={{
                    borderColor: "var(--gray-300)",
                    backgroundColor: "white",
                    focusRingColor: "var(--primary-lightest)",
                  }}
                  aria-describedby="message-error message-counter"
                />
                <div className="flex justify-between mt-1">
                  {validationErrors.message && (
                    <p id="message-error" className="text-sm text-red-600" role="alert">
                      {validationErrors.message}
                    </p>
                  )}
                  <p
                    id="message-counter"
                    className="text-sm"
                    style={{ color: "var(--gray-500)" }}
                  >
                    {formData.message.length}/500
                  </p>
                </div>
              </div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isLoading}
                className="w-full font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: "var(--primary-color)",
                  color: "white",
                  boxShadow: "var(--shadow-md)",
                  borderRadius: "var(--radius)",
                }}
              >
                {isLoading ? "Submitting..." : "Submit Feedback"}
              </motion.button>
            </form>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="text-5xl" style={{ color: "var(--primary-dark)" }}>
              ✅
            </div>
            <h3
              className="text-2xl font-semibold"
              style={{ color: "var(--gray-900)" }}
            >
              Thank You for Your Feedback!
            </h3>
            <p style={{ color: "var(--gray-600)" }}>
              Your input helps us improve our mentorship platform.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={resetForm}
              className="mt-6 px-6 py-3 font-semibold"
              style={{
                backgroundColor: "var(--primary-color)",
                color: "white",
                boxShadow: "var(--shadow-md)",
                borderRadius: "var(--radius)",
              }}
            >
              Submit Another Feedback
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default FeedbackForm;