import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Hotel, UtensilsCrossed, Sparkles, Dumbbell, Wifi, Car, ConciergeBell, Waves, ShoppingBag, Baby } from 'lucide-react';

const SectionWrapper = ({ children, className = "", id }) => (
  <section id={id} className={`py-12 md:py-16 ${className}`}>
    <div className="container-custom">{children}</div>
  </section>
);

const HomeAmenitiesSection = () => {
  const fadeIn = (delay = 0, y = 15) => ({
    initial: { opacity: 0, y: y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.2 }
  });

  const amenities = [
    { icon: <Hotel className="w-7 h-7 text-primary" />, name: "Luxurious Stays" },
    { icon: <UtensilsCrossed className="w-7 h-7 text-secondary" />, name: "Wellness Dining" },
    { icon: <Sparkles className="w-7 h-7 text-green-500" />, name: "Annam Spa" },
    { icon: <Dumbbell className="w-7 h-7 text-blue-500" />, name: "Royal Fitness" },
    { icon: <Waves className="w-7 h-7 text-sky-500" />, name: "Lagoon Pool" },
    { icon: <ShoppingBag className="w-7 h-7 text-purple-500" />, name: "Annam Boutique" },
    { icon: <ConciergeBell className="w-7 h-7 text-teal-500" />, name: "24/7 Concierge" },
    { icon: <Baby className="w-7 h-7 text-pink-500" />, name: "Family Friendly" },
  ];

  return (
    <SectionWrapper className="bg-background">
      <motion.div 
        className="text-center max-w-3xl mx-auto"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={{ animate: { transition: { staggerChildren: 0.1 } } }}
      >
        <motion.h2 
          className="text-4xl md:text-5xl font-serif text-white mb-6"
          variants={fadeIn()}
        >
          Elevate Your Stay with Our Amenities
        </motion.h2>
        <motion.p 
          className="text-lg text-muted-foreground mb-10 leading-relaxed"
          variants={fadeIn(0.1)}
        >
          Experience unparalleled comfort and convenience with our thoughtfully curated range of world-class amenities, designed to enhance your wellness journey.
        </motion.p>
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-4 gap-5 md:gap-6 mb-12"
          variants={fadeIn(0.2)}
        >
          {amenities.map((amenity, idx) => (
            <motion.div 
              key={amenity.name} 
              className="flex flex-col items-center p-4 bg-card rounded-xl shadow-lg border border-border/70 hover-lift"
              variants={fadeIn(0.25 + idx * 0.05, 10)}
            >
              <div className="p-3 bg-primary/10 rounded-full mb-2.5">
                {amenity.icon}
              </div>
              <h3 className="text-sm font-medium text-center text-paragraph-foreground">{amenity.name}</h3>
            </motion.div>
          ))}
        </motion.div>
        <motion.div variants={fadeIn(0.5)}>
          <Link to="/amenities">
            <Button size="lg" className="bg-gradient-button text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-103 px-8 py-3.5 text-base button-glow-effect">
              Explore All Amenities <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </motion.div>
      </motion.div>
    </SectionWrapper>
  );
}

export default HomeAmenitiesSection;