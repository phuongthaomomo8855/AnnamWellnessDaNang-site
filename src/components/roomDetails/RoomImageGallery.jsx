import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Maximize as MaximizeIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoomHeader from '@/components/roomDetails/RoomHeader';

const RoomImageGallery = ({ images, roomName, currentImageIndex, setCurrentImageIndex, onNext, onPrev, onImageClick, subtitle, sqm, view, capacity }) => {
  const currentImage = images[currentImageIndex];

  const galleryVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.4, ease: 'easeOut' }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.95,
      transition: { duration: 0.4, ease: 'easeIn' }
    })
  };
  
  const [direction, setDirection] = React.useState(0);

  const paginate = (newDirection) => {
    setDirection(newDirection);
    if (newDirection > 0) {
      onNext();
    } else {
      onPrev();
    }
  };
  
  return (
    <motion.div 
      variants={galleryVariants}
      initial="initial"
      animate="animate"
      className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] xl:h-[85vh] w-full overflow-hidden bg-slate-800 group"
    >
      <motion.div
        key={currentImageIndex}
        custom={direction}
        variants={imageVariants}
        initial="enter"
        animate="center"
        exit="exit"
        className="absolute inset-0 w-full h-full"
      >
        <img
          src={currentImage}
          alt={`${roomName} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
      </motion.div>

      <RoomHeader 
        name={roomName}
        subtitle={subtitle}
        sqm={sqm}
        view={view}
        capacity={capacity}
      />
      
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => paginate(-1)}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Previous Image"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => paginate(1)}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            aria-label="Next Image"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      <Button
        variant="ghost"
        size="icon"
        onClick={() => onImageClick(currentImage)}
        className="absolute bottom-4 right-4 z-10 bg-black/30 hover:bg-black/50 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        title="View Fullscreen"
      >
        <MaximizeIcon className="h-5 w-5" />
      </Button>
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > currentImageIndex ? 1 : -1);
                if (setCurrentImageIndex) setCurrentImageIndex(index);
              }}
              className={`w-2 h-2 rounded-full transition-all duration-300 ease-in-out
                ${currentImageIndex === index ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/75'}`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default RoomImageGallery;