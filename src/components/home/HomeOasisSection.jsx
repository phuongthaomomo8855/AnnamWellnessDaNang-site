import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Waves, Leaf } from 'lucide-react';

const HomeOasisSection = () => {
  const backgroundImage = "https://i.postimg.cc/G3G2nfwC/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_21.01.25.png";

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay: 0.3, ease: "easeOut" } }
  };

  const features = [
    { icon: Sun, text: "Sun-Kissed Beaches" },
    { icon: Waves, text: "Tranquil Ocean Sounds" },
    { icon: Leaf, text: "Lush Tropical Gardens" },
  ];

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative py-20 md:py-24 lg:py-32 bg-cover bg-center text-white" // Reduced padding slightly
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/50 to-transparent z-0"></div>
      
      <div className="container-custom relative z-10 text-center">
        <motion.div variants={contentVariants}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white text-shadow-lg">
            Your Oasis of Tranquility Awaits
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed text-slate-100 text-shadow-sm">
            Escape to Annam Wellness Da Nang, where serene landscapes meet luxurious comfort. Discover a sanctuary designed for ultimate relaxation and rejuvenation, nestled between pristine beaches and lush tropical gardens.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 md:gap-6 mb-12">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
                className="flex items-center bg-white/10 backdrop-blur-sm text-white py-2.5 px-5 rounded-full shadow-md"
              >
                <feature.icon className="w-5 h-5 mr-2.5 text-primary-light" />
                <span className="text-sm md:text-base font-medium">{feature.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeOasisSection;