import React from "react";
import { motion } from "framer-motion";

const WellnessTabButton = ({ label, icon: Icon, isActive, onClick, layoutId }) => (
  <motion.button
    onClick={onClick}
    className={`relative px-4 py-3 sm:px-6 sm:py-3.5 text-sm sm:text-base font-medium rounded-lg transition-colors duration-200 flex items-center justify-center
      ${isActive ? "text-white" : "text-gray-300 hover:text-white"}`}
  >
    {Icon && <Icon className={`w-4 h-4 sm:w-5 sm:h-5 mr-2 transition-colors ${isActive ? 'text-amber-400' : 'text-gray-400 group-hover:text-gray-200'}`} />}
    {label}
    {isActive && (
      <motion.div
        layoutId={layoutId}
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-400 rounded-full"
        initial={false}
        transition={{ type: "spring", stiffness: 350, damping: 30 }}
      />
    )}
  </motion.button>
);

export default WellnessTabButton;