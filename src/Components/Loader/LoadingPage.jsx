import React from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#e0e0e0]">
      <motion.div
        className="p-10 rounded-full shadow-[8px_8px_16px_#bebebe,_-8px_-8px_16px_#ffffff] bg-[#e0e0e0]"
        animate={{ rotate: 360 }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-16 h-16 border-4 border-primary border-dashed rounded-full animate-spin" />
      </motion.div>
    </div>
  );
};

export default LoadingPage;
