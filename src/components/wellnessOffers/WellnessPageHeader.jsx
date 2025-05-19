import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

const WellnessPageHeader = ({ title, description }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="text-center mb-10 md:mb-16"
    >
      <Sparkles className="w-16 h-16 text-primary mx-auto mb-4 opacity-80" />
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-gradient-gold-teal mb-4">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default WellnessPageHeader;