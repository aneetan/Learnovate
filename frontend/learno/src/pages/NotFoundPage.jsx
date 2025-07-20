import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md md:max-w-lg">
        {/* Animated 404 Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-teal-800 opacity-20">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-700">
              Page Not Found
            </h2>
          </div>
        </div>
        
        {/* Illustration */}
        <div className="mt-8 mb-10">
          <svg
            className="w-40 h-40 mx-auto text-teal-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        {/* Description */}
        <p className="mt-6 text-lg text-teal-900">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>


        {/* Action Button */}
        <Link
          to="/"
          className="inline-block px-6 py-3 text-gray-100 bg-teal-400 hover:bg-teal-500  font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105"
        >
          Return Home
        </Link>

        
      </div>
    </div>
  );
};

export default NotFoundPage;