import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Camera, Maximize, X, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && 
         (url.startsWith('http://') || url.startsWith('https://'));
};
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const momentsImagesFull = [
  { id: 1, src: "https://i.postimg.cc/m2KmHR4z/aii-aii-3-AGB2-Jb-KDk-Giqq-QBK.jpg", alt: "Sunrise Yoga Session" },
  { id: 2, src: "https://i.postimg.cc/sxYp8Bxb/thien-3-AVL7ra8Wa5HJ3yaQ.jpg", alt: "Gourmet Vietnamese Dinner" },
  { id: 3, src: "https://i.postimg.cc/bJ1gMwsK/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-16_lu%CC%81c_20.08.26.png", alt: "Resort Exterior at Dusk" },
  { id: 4, src: "https://i.postimg.cc/8kf0gF19/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_01.00.36.png", alt: "Herbal Compress Therapy" },
  { id: 5, src: "https://i.postimg.cc/9M4bxFGj/naiiu-ain-ain-AMq1y-DV56ys6-GWk-W.webp", alt: "Guests in Cooking Class" },
  { id: 6, src: "https://i.postimg.cc/8cgBSz4g/A-nh-ma-n-hi-nh-2025-05-18-lu-c-01-04-09.png", alt: "Sunset View from Balcony" },
  { id: 7, src: "https://i.postimg.cc/tT3nFt38/A-nh-ma-n-hi-nh-2025-05-18-lu-c-01-09-04.png", alt: "Relaxing Foot Massage" },
  { id: 8, src: "https://i.postimg.cc/X7pKMf76/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_10.59.24.png", alt: "Elegant Suite Interior" },
  { id: 9, src: "https://i.postimg.cc/T1DD8z4F/A-NH-NE-N-2.webp", alt: "Poolside Relaxation" },
  { id: 10, src: "https://i.postimg.cc/3JzsyPBS/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-18_lu%CC%81c_02.21.59.png", alt: "Cultural Performance Evening" },
  { id: 11, src: "https://i.postimg.cc/05Ddr4nZ/son-tra-peninsula-da-nang-summit.webp", alt: "Meditation by the Koi Pond" },
  { id: 12, src: "https://i.postimg.cc/C5jZmhpv/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_22.10.56.png", alt: "Artisanal Tea Tasting" },
].map(img => ({ 
  ...img, 
  src: isValidImageUrl(img.src) ? img.src : placeholderImage 
}));

const ITEMS_PER_PAGE = 4;

const Lightbox = ({ imageUrl, alt, onClose }) => {
  if (!imageUrl) return null;
  const displayUrl = isValidImageUrl(imageUrl) ? imageUrl : placeholderImage;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
        onClick={(e) => e.stopPropagation()} 
      >
        <img
          src={displayUrl}
          alt={alt || "Enlarged moment"}
          className="max-w-[95vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
        />
      </motion.div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-full"
        onClick={onClose}
      >
        <X size={24} />
      </Button>
    </motion.div>
  );
};

const HomeMomentsSection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const intervalRef = useRef(null);

  const totalPages = Math.ceil(momentsImagesFull.length / ITEMS_PER_PAGE);

  const openLightbox = (image) => {
    setLightboxImage(image);
  };
  const closeLightbox = () => setLightboxImage(null);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  useEffect(() => {
    intervalRef.current = setInterval(nextSlide, 7000); 
    return () => clearInterval(intervalRef.current);
  }, [totalPages]);

  const handleMouseEnter = () => clearInterval(intervalRef.current);
  const handleMouseLeave = () => intervalRef.current = setInterval(nextSlide, 7000);
  
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentImages = momentsImagesFull.slice(startIndex, endIndex);
  
  const fadeInProps = (delay = 0, y = 20) => ({
    initial: { opacity: 0, y: y },
    whileInView: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: "easeOut", delay },
    viewport: { once: true, amount: 0.15 }
  });

  return (
    <section className="pb-12 md:pb-16 bg-gradient-to-b from-background via-primary/5 to-background" id="moments-home-section">
      <div className="container-custom">
        <motion.div {...fadeInProps(0)} className="text-center mb-10 md:mb-12">
          <Camera className="w-10 h-10 md:w-12 md:h-12 text-primary mx-auto mb-3 opacity-80" />
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-gradient-gold-teal mb-2.5">Moments at Annam Wellness</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            A glimpse into the serene and rejuvenating experiences awaiting you.
          </p>
          <div className="decorative-line mt-6"></div>
        </motion.div>

        <div 
          className="relative mb-8"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <AnimatePresence initial={false} custom={currentPage}>
            <motion.div
              key={currentPage}
              custom={currentPage}
              initial={{ opacity: 0.8, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0.8, x: -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4"
            >
              {currentImages.map((image, index) => (
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
                  className="aspect-[4/3] rounded-lg overflow-hidden shadow-lg group cursor-pointer relative hover-lift"
                  onClick={() => openLightbox(image)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-2 md:p-3">
                    <Maximize size={24} className="text-white/70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110" />
                    <p className="text-white text-xs font-medium line-clamp-2">{image.alt}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {totalPages > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                onClick={prevSlide}
                className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 hover:bg-background/80 text-foreground hover:text-primary p-1.5 h-8 w-8 md:h-10 md:w-10 shadow-md"
                aria-label="Previous moments"
              >
                <ChevronLeft className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={nextSlide}
                className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 rounded-full bg-background/50 hover:bg-background/80 text-foreground hover:text-primary p-1.5 h-8 w-8 md:h-10 md:w-10 shadow-md"
                aria-label="Next moments"
              >
                <ChevronRight className="h-4 w-4 md:h-5 md:w-5" />
              </Button>
            </>
          )}
        </div>
        
         <div className="flex justify-center space-x-2 mt-6">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index)}
                className={`w-2 h-2 md:w-2.5 md:h-2.5 rounded-full transition-all duration-300 ease-in-out
                  ${currentPage === index ? 'bg-primary scale-125' : 'bg-muted hover:bg-primary/50'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

      </div>
      <AnimatePresence>
        {lightboxImage && <Lightbox imageUrl={lightboxImage.src} alt={lightboxImage.alt} onClose={closeLightbox} />}
      </AnimatePresence>
    </section>
  );
};

export default HomeMomentsSection;