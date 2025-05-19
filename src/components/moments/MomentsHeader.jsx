import React from 'react';
import { motion } from 'framer-motion';

const MomentsHeader = ({ heroData }) => {
  if (!heroData) {
    return (
      <section className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white bg-primary-dark">
        <div className="relative z-20 p-4 container-custom">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-shadow-strong"
          >
            Our Moments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-shadow-soft"
          >
            Explore captivating snapshots of Annam Wellness.
          </motion.p>
        </div>
      </section>
    );
  }

  return (
    <section 
      className="relative h-[50vh] md:h-[60vh] flex items-center justify-center text-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${heroData.backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10"></div>
      <div className="relative z-20 p-4 container-custom">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-shadow-strong"
        >
          {heroData.title}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-shadow-soft"
        >
          {heroData.subtitle}
        </motion.p>
      </div>
    </section>
  );
};

export default MomentsHeader;