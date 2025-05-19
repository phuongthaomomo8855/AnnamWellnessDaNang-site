import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Lightbox from '@/components/roomDetails/Lightbox';
import { Link } from 'react-router-dom';

const commitmentImages = [
  { src: "https://i.postimg.cc/02CybJyX/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_21.07.55.png", alt: "Warm welcome at Annam Wellness Da Nang" },
  { src: "https://i.postimg.cc/rpDVnnC7/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_21.31.15.png", alt: "Peaceful natural surroundings" },
  { src: "https://i.postimg.cc/MTj4Yd96/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_13.09.41.png", alt: "Serene resort atmosphere" },
  { src: "https://i.postimg.cc/rpy1VH5z/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_23.17.25.png", alt: "Dedicated staff providing excellent service" },
];

const isValidImageUrl = (url) => url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const HomeCommitmentSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const intervalRef = useRef(null);

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % commitmentImages.length);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + commitmentImages.length) % commitmentImages.length);
  };
  
  useEffect(() => {
    intervalRef.current = setInterval(handleNextImage, 5000); 
    return () => clearInterval(intervalRef.current);
  }, []);

  const openLightbox = (imageUrl) => {
    setLightboxImage(isValidImageUrl(imageUrl) ? imageUrl : placeholderImage);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const currentImageSrc = isValidImageUrl(commitmentImages[currentImageIndex].src) 
    ? commitmentImages[currentImageIndex].src 
    : placeholderImage;
  
  const currentImageAlt = commitmentImages[currentImageIndex].alt;

  return (
    <section className="section-padding bg-gradient-to-br from-primary/5 via-background to-secondary/10">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <h2 className="text-gradient-gold-teal mb-6 text-3xl md:text-4xl">Our Commitment to Your Wellbeing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              At Annam Wellness, the absolute comfort and relaxation of our guests is always our top priority. From the moment you arrive, you will feel a warm, friendly yet sophisticated welcome – as if returning to a place you have known for a long time.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Every little detail, from a cup of warm tea with the typical flavor of Da Nang to a peaceful space filled with nature, is taken care of to bring a complete feeling of “healing”. We believe that the sincerity in every smile and the dedication in every service are what create the Annam signature resort experience – where you can not only rest, but also be healed.
            </p>
            <Link to="/wellness-menu">
              <Button 
                variant="default" 
                size="lg"
                className="bg-gradient-button text-white button-glow-effect mt-4"
              >
                Discover More Our Wellness Offers
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <div className="decorative-line mt-8 border-primary/30"></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative w-full aspect-[4/3] md:aspect-video lg:aspect-[4/3] overflow-hidden rounded-xl shadow-2xl group order-1 lg:order-2"
            onMouseEnter={() => clearInterval(intervalRef.current)}
            onMouseLeave={() => intervalRef.current = setInterval(handleNextImage, 5000)}
          >
            <AnimatePresence initial={false} custom={currentImageIndex}>
              <motion.img
                key={currentImageSrc}
                src={currentImageSrc}
                alt={currentImageAlt}
                custom={currentImageIndex}
                initial={{ opacity: 0.7, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.7, scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {commitmentImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrevImage}
                  className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white hover:text-white p-2 h-10 w-10 md:h-12 md:w-12 opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNextImage}
                  className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white hover:text-white p-2 h-10 w-10 md:h-12 md:w-12 opacity-50 group-hover:opacity-100 transition-opacity"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </Button>
              </>
            )}
             <Button
              variant="ghost"
              size="icon"
              onClick={() => openLightbox(currentImageSrc)}
              className="absolute bottom-3 right-3 z-10 rounded-full bg-black/20 hover:bg-black/40 text-white hover:text-white p-2 h-10 w-10 md:h-12 md:w-12 opacity-50 group-hover:opacity-100 transition-opacity"
              aria-label="Enlarge image"
            >
              <Maximize className="h-5 w-5 md:h-6 md:w-6" />
            </Button>

            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex space-x-2 opacity-50 group-hover:opacity-100 transition-opacity">
              {commitmentImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-colors ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white/75'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={closeLightbox} alt="Annam Wellness Commitment Gallery" />}
      </AnimatePresence>
    </section>
  );
};

export default HomeCommitmentSection;