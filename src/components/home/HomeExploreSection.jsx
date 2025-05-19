import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Droplets, ArrowRight, Zap, Leaf, Wind, Sun, Building2, HeartPulse, Users, Trees, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const fadeInProps = (delay = 0, y = 20) => ({
  initial: { opacity: 0, y: y },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut", delay },
  viewport: { once: true, amount: 0.1 }
});

const galleryImages = [
  "https://i.postimg.cc/fbDd1nqJ/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_10.09.10.png",
  "https://i.postimg.cc/G2SN25jb/ain-9-YleWr4XNkDtbao1B.png",
  "https://i.postimg.cc/jdfMyfWK/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_11.00.18.png",
  "https://i.postimg.cc/GtVYf46C/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_09.57.24.png",
  "https://i.postimg.cc/xjhsk51t/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_11.03.53.png",
  "https://i.postimg.cc/pV4FRn1N/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_10.43.28.png"
];

const ImageGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % galleryImages.length);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + galleryImages.length) % galleryImages.length);
  };

  useEffect(() => {
    let timer;
    if (!isHovering) {
      timer = setInterval(handleNext, 3000);
    }
    return () => clearInterval(timer);
  }, [currentIndex, isHovering, handleNext]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
      };
    }
  };
  
  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    if (newDirection > 0) {
      handleNext();
    } else {
      handlePrev();
    }
  };


  return (
    <motion.div 
      {...fadeInProps(0.2)}
      className="relative w-full aspect-[16/9] md:aspect-[16/7] overflow-hidden rounded-xl shadow-2xl group mb-16 md:mb-20"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.img
          key={currentIndex}
          src={galleryImages[currentIndex]}
          custom={currentIndex}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.3 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);
            if (swipe < -swipeConfidenceThreshold) {
              paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
              paginate(-1);
            }
          }}
          alt={`Annam Wellness Gallery Image ${currentIndex + 1}`}
          className="absolute w-full h-full object-cover"
        />
      </AnimatePresence>
      <button 
        onClick={handlePrev}
        className="absolute top-1/2 left-2 md:left-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 focus:outline-none hover:bg-black/60"
        aria-label="Previous Image"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={handleNext}
        className="absolute top-1/2 right-2 md:right-4 transform -translate-y-1/2 bg-black/40 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 focus:outline-none hover:bg-black/60"
        aria-label="Next Image"
      >
        <ChevronRight size={24} />
      </button>
      <div className="absolute bottom-0 left-0 right-0 p-2 md:p-4 flex justify-center z-10">
        {galleryImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full mx-1 transition-all duration-300
              ${currentIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}
            `}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </motion.div>
  );
};


const featureItems = [
  {
    icon: Building2,
    title: "Cultural Architecture",
    description: "Huế imperial elegance meets Indochine charm — every detail tells a story of Vietnam’s rich heritage."
  },
  {
    icon: HeartPulse,
    title: "Inner Healing",
    description: "Mindful meditation, herbal therapies, and private spa rituals crafted for deep restoration."
  },
  {
    icon: Users,
    title: "Authentic Local Living",
    description: "Sip lotus tea, join craft workshops, or explore village life — live like a local."
  },
  {
    icon: Trees,
    title: "Nature Immersion",
    description: "Gardens, lotus ponds, and sea breezes — nature surrounds and heals in every step."
  }
];


const HomeExploreSection = () => {
  return (
    <section id="home-explore-journey" className="section-padding bg-gradient-to-br from-background to-background-alt">
      <div className="container-custom">
        <motion.div {...fadeInProps(0)} className="text-center mb-12 md:mb-16">
          <Droplets className="w-12 h-12 text-primary mx-auto mb-4 opacity-80" />
          <h2 className="text-secondary-dark mb-4">Your Journey to Annam Wellness</h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Annam Wellness Da Nang is not just a retreat — it's a journey into the heart of Central Vietnam. Nestled between heritage and nature, our sanctuary invites you to reconnect with yourself while embracing the soul of local culture.
          </p>
          <div className="decorative-line mt-8"></div>
        </motion.div>

        <ImageGallery />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {featureItems.map((item, index) => (
            <motion.div
              key={index}
              {...fadeInProps(0.3 + index * 0.1)}
              className="bg-card p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-center text-center border border-border/30 hover-lift"
            >
              <div className="p-3.5 bg-primary/10 rounded-full mb-4 inline-block ring-2 ring-primary/20">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-heading-foreground mb-1.5">{item.title}</h3>
              <p className="text-sm text-paragraph-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          {...fadeInProps(0.4)}
          className="mt-16 md:mt-20 text-center"
        >
          <Button asChild size="lg" className="bg-gradient-button text-white button-glow-effect px-8 py-3 text-base">
            <Link to="/cultural-experiences">
              Discover More Our Local Features Offers <Sparkles className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
};

export default HomeExploreSection;