import React from 'react';
import { motion } from 'framer-motion';
import { Maximize } from 'lucide-react';

const isValidImageUrl = (url) => url && typeof url === 'string' && (url.startsWith('https://i.postimg.cc') || url.startsWith('http://') || url.startsWith('https://'));
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const SubRoomGallery = ({ images, roomName, onImageClick }) => {
   if (!images || images.length === 0) {
    return null; 
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
      {images.map((img, index) => {
        const imageSource = typeof img === 'string' ? img : img.src;
        const displayImage = isValidImageUrl(imageSource) ? imageSource : placeholderImage;
        const altText = (typeof img === 'object' && img.alt) ? img.alt : `${roomName} Gallery Image ${index + 1}`;
        
        return (
          <motion.div 
            key={index}
            className="aspect-square rounded-lg overflow-hidden shadow-md group cursor-pointer relative"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            viewport={{ once: true }}
            onClick={() => onImageClick(displayImage)}
            whileHover={{ scale: 1.03, boxShadow: "0px 10px 20px rgba(0,0,0,0.1)" }}
          >
            <img
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              alt={altText}
              src={displayImage}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <Maximize size={28} className="text-white/90 transform group-hover:scale-110 transition-transform" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default SubRoomGallery;