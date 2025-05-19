import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Leaf, Utensils, Palette, Mountain, Users, ArrowRight } from 'lucide-react';
import ServiceBookingModal from "@/components/services/ServiceBookingModal";
import { culturalPageData } from "@/data/wellness/culturalExperiences"; 

const ExperienceCard = ({ experience, index, onBookExperience }) => {
  const IconComponent = experience.icon || Leaf;
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-border/30 hover:shadow-xl transition-shadow duration-300 group"
    >
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img 
          src={experience.image}
          alt={experience.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-full shadow-md">
          <IconComponent className="w-6 h-6" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-heading-foreground group-hover:text-primary transition-colors mb-3">{experience.title}</h3>
        <p className="text-paragraph-foreground text-sm mb-4 flex-grow">{experience.description}</p>
        <div className="mb-4">
          {(experience.tags || []).map(tag => (
            <span key={tag} className="inline-block bg-secondary/10 text-secondary-dark text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        <p className="text-xs text-muted-foreground mb-4">{experience.details?.join ? experience.details.join(' | ') : experience.details}</p>
        <Button 
          variant="outline" 
          className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => onBookExperience(experience)}
        >
          Learn More & Book <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </motion.div>
  );
};

const CulturalExperiencesPage = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [currentHeroImageIndex, setCurrentHeroImageIndex] = useState(0);
  const heroImageIntervalRef = useRef(null);
  const navigate = useNavigate();

  const heroImages = culturalPageData.heroImages || [culturalPageData.pageHeaderImage || "https://i.postimg.cc/qBDVrtCd/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.30.49.png"];

  useEffect(() => {
    if (heroImages.length > 1) {
      heroImageIntervalRef.current = setInterval(() => {
        setCurrentHeroImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
      }, 3000);
    }
    return () => clearInterval(heroImageIntervalRef.current);
  }, [heroImages.length]);

  const handleBookExperience = (experience) => {
    setSelectedExperience({
        id: experience.id, 
        title: experience.title, 
        name: experience.title, 
        price: "Contact for pricing" 
    });
    setIsBookingModalOpen(true);
  };

  const handleModalOpenChange = (openState) => {
    setIsBookingModalOpen(openState);
    if (!openState) {
      setSelectedExperience(null);
    }
  };
  
  const handleBookingSuccess = (bookingData) => {
     // The modal now navigates to confirmation on success
  };


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-background"
    >
      <section className="relative h-[60vh] md:h-[70vh] flex items-center justify-center text-center overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <AnimatePresence initial={false} custom={currentHeroImageIndex}>
            <motion.img
              key={currentHeroImageIndex}
              src={heroImages[currentHeroImageIndex]}
              alt={`Cultural experiences background ${currentHeroImageIndex + 1}`}
              custom={currentHeroImageIndex}
              initial={{ opacity: 0, scale: 1.1, filter: "blur(3px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(3px)" }}
              transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
        <div className="relative z-20 p-4 container-custom">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl md:text-6xl font-serif mb-4 text-white text-shadow-strong"
          >
            {culturalPageData.pageTitle}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto text-gray-200 text-shadow-soft"
          >
            {culturalPageData.pageDescription}
          </motion.p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background-alt">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12">
            {culturalPageData.experiences.map((exp, index) => (
              <ExperienceCard key={exp.id} experience={exp} index={index} onBookExperience={handleBookExperience} />
            ))}
          </div>
        </div>
      </section>

      <section 
        className="py-16 md:py-24 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${culturalPageData.cta?.backgroundImage || "https://i.postimg.cc/HsJGkpQ8/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.27.57.png"})` }}
      >
        <div className="absolute inset-0 bg-black/60 z-0"></div>
        <div className="container-custom text-center relative z-10">
          <motion.h2 
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-serif text-white mb-6 text-shadow-strong"
          >
            {culturalPageData.cta?.title || "Embark on Your Cultural Journey"}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay:0.2 }}
            className="text-lg text-gray-200 max-w-xl mx-auto mb-8 text-shadow-soft"
          >
            {culturalPageData.cta?.description || "Deepen your connection with Vietnam's vibrant culture. Book your preferred experiences now and create lasting memories."}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y:20 }}
            whileInView={{ opacity: 1, y:0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, delay:0.4 }}
          >
            <Button asChild size="lg" className="bg-gradient-button text-white button-glow-effect px-8 py-3 text-base">
              <Link to={culturalPageData.cta?.buttonLink || "/booking"}>
                {culturalPageData.cta?.buttonText || "Inquire About Experiences"} <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      <ServiceBookingModal
        open={isBookingModalOpen}
        onOpenChange={handleModalOpenChange}
        service={selectedExperience}
        onBookingSubmitSuccess={handleBookingSuccess}
        serviceCategory="Cultural Experiences"
      />
    </motion.div>
  );
};

export default CulturalExperiencesPage;