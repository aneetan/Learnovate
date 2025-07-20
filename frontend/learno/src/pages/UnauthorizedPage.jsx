import { Link } from "react-router-dom";

const UnauthorizedPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md md:max-w-lg">
        {/* Animated 403 Text */}
        <div className="relative">
          <h1 className="text-9xl font-bold text-teal-800 opacity-20">403</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <h2 className="text-4xl md:text-5xl font-bold text-teal-700">
              Access Denied
            </h2>
          </div>
        </div>

        {/* Description */}
        <p className="mt-6 text-lg text-teal-900">
          You don't have permission to access this resource.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col mt-8 sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="px-6 py-3 text-white bg-teal-400 hover:bg-teal-400 font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Return Home
          </Link>
          <Link
            to="/login"
            className="px-6 py-3 bg-white hover:bg-gray-100 text-teal-600 border border-teal-600 font-medium rounded-lg shadow-md transition duration-300 transform hover:scale-105"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;