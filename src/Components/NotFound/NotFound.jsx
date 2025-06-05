import { Link } from "react-router";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#e0e0e0] text-gray-800">
      <motion.div
        className="neumorphic p-10 rounded-2xl text-center max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <p className="text-2xl font-semibold mb-2">Page Not Found</p>
        <p className="mb-6 text-sm text-gray-600">
          The page you're looking for doesn’t exist or has been moved.
        </p>
        <Link
          to="/"
          className="btn btn-primary shadow-lg hover:scale-105 transition-transform"
        >
          ⬅️ Go Home
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;
