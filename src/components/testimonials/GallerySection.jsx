import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lightbox from '@/components/roomDetails/Lightbox';
import { Maximize } from 'lucide-react';

const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};

const galleryImagesData = [
  { src: "https://i.postimg.cc/T1DD8z4F/A-NH-NE-N-2.webp", alt: "Serene resort pool at dusk" },
  { src: "https://i.postimg.cc/nzF737w5/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.23.38.png", alt: "Lush garden pathway" },
  { src: "https://i.postimg.cc/fbhY017M/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.23.13.png", alt: "Aerial view of resort coastline" },
  { src: "https://i.postimg.cc/PqJ0CtZ8/A-nh-ma-n-hi-nh-2025-05-17-lu-c-13-13-43.png", alt: "Sunset over the ocean horizon" },
  { src: "https://i.postimg.cc/C5T2rk2j/A-nh-ma-n-hi-nh-2025-05-17-lu-c-13-44-30.png", alt: "Cozy outdoor seating area" },
  { src: "https://i.postimg.cc/fycrGk41/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_13.43.57.png", alt: "Architectural detail of resort building" },
  { src: "https://i.postimg.cc/HnqbVYMT/ainh-main-hiinh-2025-05-16-luic-11-1.webp", alt: "Peaceful evenings by the resort pool" },
  { src: "https://i.postimg.cc/cH18Nb8h/A-nh-ma-n-hi-nh-2025-05-17-lu-c-16-38-33.png", alt: "Interior detail of a luxurious suite" },
  { src: "https://i.postimg.cc/VkYxc9kg/A%CC%89nh_ma%CC%80n_hi%CC%80nh_2025-05-17_lu%CC%81c_11.28.37.png", alt: "Beautifully landscaped resort grounds" },
];

const GallerySection = () => {
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (imageUrl) => {
    setLightboxImage(isValidImageUrl(imageUrl) ? imageUrl : placeholderImage);
  };

  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
    hover: { scale: 1.05, transition: { duration: 0.3 } }
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-background to-secondary/5">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif text-heading-foreground mb-3">
            Natural Scenery, Relaxing Atmosphere
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Immerse yourself in the tranquil beauty surrounding Annam Wellness.
          </p>
          <div className="decorative-line mt-4"></div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {galleryImagesData.map((image, index) => (
            <motion.div
              key={index}
              variants={imageVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true, amount: 0.3 }}
              className={`relative aspect-square rounded-lg overflow-hidden shadow-lg cursor-pointer group
                ${index === 0 || index === 6 ? 'md:col-span-1 md:row-span-1' : ''}
                ${index === 1 || index === 4 ? 'md:col-span-1 md:row-span-1' : ''}
                ${index === 2 || index === 5 || index === 8 ? 'md:col-span-1 md:row-span-1' : ''}
                ${index === 3 || index === 7 ? 'md:col-span-1 md:row-span-1' : ''}
              `}
              onClick={() => openLightbox(image.src)}
            >
              <img 
                src={isValidImageUrl(image.src) ? image.src : placeholderImage}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Maximize className="w-8 h-8 text-white/80" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {lightboxImage && <Lightbox imageUrl={lightboxImage} onClose={closeLightbox} />}
      </AnimatePresence>
    </section>
  );
};

export default GallerySection;