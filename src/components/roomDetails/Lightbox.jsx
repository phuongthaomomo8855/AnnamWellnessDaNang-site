import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { X } from 'lucide-react';

const Lightbox = ({ imageUrl, onClose }) => {
  if (!imageUrl) return null;
  const altText = `Enlarged room view: ${imageUrl}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 flex items-center justify-center z-[100] p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="max-w-full max-h-full flex items-center justify-center"
        onClick={(e) => e.stopPropagation()} 
      >
        <img 
          src={imageUrl}
          alt="Enlarged room view"
          className="object-contain rounded-lg shadow-2xl max-w-full max-h-full"
         src="https://images.unsplash.com/photo-1697256200022-f61abccad430" />
      </motion.div>
      <Button
        variant="outline"
        size="icon"
        className="absolute top-5 right-5 bg-primary/80 hover:bg-primary text-primary-foreground border-primary/60 backdrop-blur-sm"
        onClick={onClose}
      >
        <X size={20} />
      </Button>
    </motion.div>
  );
};

export default Lightbox;