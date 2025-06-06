// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaRegSadTear } from "react-icons/fa";

const NoBlogsFound = () => {
  return (
    <motion.div
      className="neumorphism p-8 rounded-xl text-center w-full max-w-lg mx-auto mt-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-center text-5xl text-gray-600 mb-4">
        <FaRegSadTear />
      </div>
      <h2 className="text-2xl font-bold text-gray-700">No Blogs Found</h2>
      <p className="text-gray-500 mt-2">
        We couldn't find any blogs at the moment. Try again later or add a new blog!
      </p>
    </motion.div>
  );
};

export default NoBlogsFound;
