import React from 'react';
import { motion } from 'framer-motion';
import RoomSection from '@/components/roomDetails/RoomSection';
import FeatureList from '@/components/roomDetails/FeatureList';
import SubRoomGallery from '@/components/roomDetails/SubRoomGallery'; 
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Award, Sparkles, ShoppingBag } from 'lucide-react';

const RoomDetailsMainContent = ({ room, onImageClick }) => {
  if (!room) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 md:space-y-10"
    >
      <motion.div variants={itemVariants}>
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary-dark mb-3 tracking-tight">
          {room.name}
        </h2>
        <p className="text-lg text-muted-foreground italic">{room.subtitle}</p>
      </motion.div>

      <motion.div variants={itemVariants}>
        <p className="text-foreground/80 leading-relaxed whitespace-pre-line">
          {room.description}
        </p>
      </motion.div>
      
      {room.galleryImages && room.galleryImages.length > 0 && (
        <motion.div variants={itemVariants}>
          <RoomSection title="Explore Your Sanctuary">
            <SubRoomGallery 
              images={room.galleryImages} 
              roomName={room.name} 
              onImageClick={onImageClick} // Propagate to open lightbox from main page
            />
          </RoomSection>
        </motion.div>
      )}

      {room.keyFeatures && room.keyFeatures.length > 0 && (
        <motion.div variants={itemVariants}>
          <RoomSection title="Key Features & Highlights" icon={<Award className="w-6 h-6 text-amber-500" />}>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-foreground/80">
              {room.keyFeatures.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Sparkles className="w-4 h-4 mr-2.5 mt-1 text-primary/70 flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </RoomSection>
        </motion.div>
      )}

      {room.amenities && room.amenities.length > 0 && (
        <motion.div variants={itemVariants}>
          <RoomSection title="Amenities & Comforts">
            <FeatureList features={room.amenities} />
          </RoomSection>
        </motion.div>
      )}
      
      {room.promotionalOffer && (
        <motion.div 
          variants={itemVariants}
          className="p-6 bg-gradient-to-tr from-primary/5 via-transparent to-secondary/5 border border-primary/30 rounded-lg shadow-lg"
        >
          <h3 className="text-xl font-semibold text-primary-dark mb-2 flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2 text-primary" />
            {room.promotionalOffer.title}
          </h3>
          <p className="text-foreground/80 mb-4">{room.promotionalOffer.description}</p>
          <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
            <Link to={room.promotionalOffer.link}>{room.promotionalOffer.linkText}</Link>
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default RoomDetailsMainContent;