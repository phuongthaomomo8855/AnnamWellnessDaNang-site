import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Maximize } from 'lucide-react';
import Lightbox from '@/components/roomDetails/Lightbox';

const HeroImageSlider = ({ images, fallbackImage, interval = 3000, children, sectionHeight = 'h-[60vh] md:h-[75vh]' }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);
  const imageIntervalRef = useRef(null);

  const imageSources = images && images.length > 0 ? images : [fallbackImage || 'https://via.placeholder.com/1920x1080?text=Default+Image'];

  const handleNextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % imageSources.length);
  };

  const handlePrevImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + imageSources.length) % imageSources.length);
  };

  useEffect(() => {
    if (imageSources.length > 1) {
      imageIntervalRef.current = setInterval(handleNextImage, interval);
    }
    return () => clearInterval(imageIntervalRef.current);
  }, [imageSources.length, interval]);

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };
  const closeLightbox = () => setLightboxImage(null);

  const currentImageSrc = imageSources[currentIndex];
  const currentImageAlt = `Hero background ${currentIndex + 1}`;

  return (
    <section
      className={`relative ${sectionHeight} flex items-center justify-center text-center overflow-hidden group`}
      onMouseEnter={() => imageSources.length > 1 && clearInterval(imageIntervalRef.current)}
      onMouseLeave={() => imageSources.length > 1 && (imageIntervalRef.current = setInterval(handleNextImage, interval))}
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <AnimatePresence initial={false} custom={currentIndex}>
        <motion.img
          key={currentImageSrc}
          src={currentImageSrc}
          alt={currentImageAlt}
          custom={currentIndex}
          initial={{ opacity: 0.7, scale: 1.1, filter: "blur(3px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(3px)" }}
          transition={{ duration: 1.5, ease: [0.42, 0, 0.58, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
      {imageSources.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={handlePrevImage}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/25 hover:bg-black/45 text-white p-2 h-10 w-10 md:h-12 md:w-12 opacity-60 group-hover:opacity-100 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleNextImage}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-20 rounded-full bg-black/25 hover:bg-black/45 text-white p-2 h-10 w-10 md:h-12 md:w-12 opacity-60 group-hover:opacity-100 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => openLightbox(currentImageSrc)}
            className="absolute bottom-3 right-3 md:bottom-4 md:right-4 z-20 rounded-full bg-black/25 hover:bg-black/45 text-white p-2 h-10 w-10 md:h-12 md:w-12 opacity-60 group-hover:opacity-100 transition-all"
            aria-label="Enlarge image"
          >
            <Maximize className="h-5 w-5 md:h-6 md:w-6" />
          </Button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2 opacity-60 group-hover:opacity-100 transition-opacity">
            {imageSources.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex ? 'bg-white scale-125' : 'bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="relative z-20 p-4 container-custom">
        {children}
      </div>
      <AnimatePresence>
        {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={closeLightbox} alt="Hero Gallery" />}
      </AnimatePresence>
    </section>
  );
};

export default HeroImageSlider;