import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { culturalPageData } from "@/data/wellness/culturalExperiences"; 

const CulturalExperiencesHomeSection = () => {
  const fadeInProps = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y: y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.15 }
  });

  const pageTitle = culturalPageData.pageTitle || "Authentic Cultural Immersion";
  const pageDescription = culturalPageData.pageDescription || "At Annam Wellness, we believe true healing involves a deep connection with oneself and the surrounding culture. We invite you to explore the beauty and depth of Vietnamese heritage through thoughtfully curated experiences.";
  const backgroundImage = culturalPageData.pageHeaderImage || "https://i.postimg.cc/KYn2nYwR/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-16_lu%CC%81c_22.04.19.png";


  return (
    <section 
      id="cultural-experiences-home" 
      className="relative section-padding bg-cover bg-center bg-no-repeat text-white"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <div className="container-custom relative z-10 text-center">
        <motion.div
          {...fadeInProps()}
          className="mb-10 md:mb-12"
        >
          <Users className="w-14 h-14 text-primary mx-auto mb-5 opacity-90" />
          <h2 className="text-4xl md:text-5xl font-serif mb-6 text-shadow-on-dark-bg">{pageTitle}</h2>
          <p className="text-lg md:text-xl text-gray-100 max-w-3xl mx-auto leading-relaxed text-shadow-on-dark-bg">
            {pageDescription}
          </p>
          <div className="decorative-line-teal mt-8 mx-auto w-24"></div>
        </motion.div>

        <motion.div 
          {...fadeInProps(0.4)}
          className="text-center"
        >
          <Link to="/cultural-experiences">
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-xl hover:from-primary-dark hover:to-accent/90 text-white shadow-lg px-10 py-3.5 text-lg rounded-lg transition-all duration-300 button-glow-effect">
              Discover More <ArrowRight className="w-5 h-5 ml-2.5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CulturalExperiencesHomeSection;