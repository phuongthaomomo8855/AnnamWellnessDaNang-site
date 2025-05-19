import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CalendarCheck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomeBookingCta = () => {
  const backgroundImage = "https://i.postimg.cc/TwWPw7Kn/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_20.34.10.png";

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.8, ease: "easeOut" } 
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.7, delay: 0.3, ease: "easeOut" } 
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      boxShadow: "0px 0px 15px rgba(251, 191, 36, 0.6)",
      transition: { duration: 0.3, yoyo: Infinity }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.section
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="relative py-20 md:py-32 lg:py-40 bg-cover bg-center text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
      id="booking-cta-home"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/50 via-secondary/60 to-black/70 z-0"></div>
      
      <div className="container-custom relative z-10 text-center">
        <motion.div variants={contentVariants}>
          <Sparkles className="w-12 h-12 md:w-16 md:h-16 text-amber-300 mx-auto mb-4 md:mb-6 opacity-90" />
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-white text-shadow-lg">
            Begin Your Wellness Journey Today
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-10 md:mb-12 leading-relaxed text-slate-100 text-shadow-sm">
            Secure your serene escape at Annam Wellness Da Nang. Exclusive offers and unforgettable experiences await.
          </p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/rooms">
              <Button 
                size="xl" 
                className="bg-gradient-button text-white button-glow-effect py-4 px-10 text-lg md:text-xl rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                asChild
              >
                <motion.div
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <CalendarCheck className="mr-2.5 h-6 w-6" />
                  Book Your Stay
                  <ArrowRight className="ml-2.5 h-6 w-6" />
                </motion.div>
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default HomeBookingCta;