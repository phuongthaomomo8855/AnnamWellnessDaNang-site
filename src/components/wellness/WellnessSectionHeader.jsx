import React from "react";
import { motion } from "framer-motion";

const WellnessSectionHeader = ({ title, description }) => (
  <motion.div 
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: "easeOut" }}
    className="text-center mb-10 md:mb-12 px-4"
  >
    <h1 className="text-4xl md:text-5xl font-serif text-white mb-4 text-shadow-strong">
      {title}
    </h1>
    {description && (
      <p className="text-md md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    )}
  </motion.div>
);

export default WellnessSectionHeader;