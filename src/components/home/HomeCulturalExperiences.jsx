import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Landmark, ArrowRight } from "lucide-react";

const HomeCulturalExperiences = () => {
  const fadeIn = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y: y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: "easeOut" },
    viewport: { once: true, amount: 0.2 }
  });

  return (
    <div className="relative overflow-hidden rounded-2xl shadow-2xl bg-card border border-border/60">
      <div className="absolute inset-0">
        <img 
          src="https://i.postimg.cc/HnqbVYMT/ainh-main-hiinh-2025-05-16-luic-11-1.webp"
          alt="Traditional Vietnamese cultural performance with vibrant costumes and music"
          className="w-full h-full object-cover opacity-35"
         />
        <div className="absolute inset-0 bg-gradient-to-br from-secondary/30 via-primary/20 to-black/50"></div>
      </div>

      <div className="relative container-custom text-center py-20 md:py-28">
        <motion.div {...fadeIn(0.1)}>
          <Landmark className="w-14 h-14 text-secondary mx-auto mb-5 opacity-90" />
        </motion.div>

        <motion.h2 
          {...fadeIn(0.2)}
          className="text-3xl md:text-4xl lg:text-5xl font-serif text-white mb-6 leading-tight text-shadow-on-dark-bg"
        >
          Authentic Cultural Immersion
        </motion.h2>
        
        <motion.p 
          {...fadeIn(0.3)}
          className="text-lg md:text-xl text-gray-100 max-w-2xl mx-auto mb-10 leading-relaxed text-shadow-on-dark-bg"
        >
          Connect with the rich heritage of Vietnam. Explore local traditions, art, and spirituality through our curated cultural experiences, designed to deepen your understanding and appreciation of this vibrant land.
        </motion.p>

        <motion.div {...fadeIn(0.4)}>
          <Link to="/cultural-experiences">
            <Button size="lg" className="bg-gradient-button text-white shadow-xl px-8 py-4 text-base rounded-lg transform hover:scale-105 transition-transform duration-300 button-glow-effect">
              Discover All Experiences <ArrowRight className="w-5 h-5 ml-2.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default HomeCulturalExperiences;