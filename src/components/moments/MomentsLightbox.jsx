import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9, y: "-50%" },
  visible: { opacity: 1, scale: 1, y: "-50%", transition: { type: "spring", stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.9, y: "-40%" },
};

const MomentsLightbox = ({ imageUrl, onClose, cta }) => {
  if (!imageUrl) return null;

  return (
    <AnimatePresence>
      {imageUrl && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative bg-card p-2 rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()} 
          >
            <div className="flex-grow relative overflow-hidden rounded">
              <img 
                src={imageUrl} 
                alt="Enlarged moment" 
                className="w-full h-full object-contain"
              />
            </div>
            <button
              onClick={onClose}
              className="absolute top-3 right-3 bg-background/50 hover:bg-background/80 text-foreground p-2 rounded-full transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={20} />
            </button>
            
            {cta && (
              <div className="p-4 text-center border-t border-border mt-2">
                <h3 className="text-lg font-semibold text-primary mb-1">{cta.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{cta.description}</p>
                <Button asChild className="bg-gradient-button text-white button-glow-effect">
                  <Link to={cta.buttonLink || "/booking"}>
                    {cta.buttonText || "Book Your Stay"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MomentsLightbox;