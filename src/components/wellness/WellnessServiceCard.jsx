import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import * as LucideIcons from "lucide-react";

const { Clock, Tag, Check, Users } = LucideIcons;

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (
    url.startsWith('https://i.postimg.cc') || 
    url.startsWith('http://') || 
    url.startsWith('https://') 
  );
};
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const WellnessServiceCard = ({ item, onSelectService }) => {
  const imageUrl = isValidImageUrl(item.image) ? item.image : placeholderImage;
  const isPackageOffer = item.category === "Wellness Packages";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-white/5 backdrop-blur-md rounded-xl shadow-xl overflow-hidden flex flex-col group border border-white/10 hover:border-white/20 h-full"
    >
      <div className="relative h-52 sm:h-60 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={item.title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className={`font-semibold text-amber-300 mb-2 group-hover:text-amber-200 transition-colors line-clamp-2 ${isPackageOffer ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'}`}>
          {item.title}
        </h3>
        {item.subTitle && <p className="text-xs text-amber-400/80 mb-2">{item.subTitle}</p>}
        
        {isPackageOffer ? (
          <div className="text-xs text-gray-300 space-y-1.5 mb-4 border-t border-white/10 pt-3 mt-auto flex-grow">
            {item.targetAudience && <p className="flex items-center text-gray-400 italic text-xs mb-2"><Users className="w-3 h-3 mr-1.5 text-amber-400/70" /> {item.targetAudience}</p>}
            {item.descriptionItems && item.descriptionItems.map((descItem, idx) => (
              <p key={idx} className="flex items-start text-gray-200">
                <Check className="w-3 h-3 mr-1.5 mt-0.5 text-green-400/80 flex-shrink-0" /> 
                {descItem}
              </p>
            ))}
             {item.price && <p className="flex items-center mt-2 text-gray-100 font-medium"><Tag className="w-3.5 h-3.5 mr-1.5 text-amber-400/80" /> Price: {item.price}</p>}
          </div>
        ) : (
          <p className="text-xs sm:text-sm text-gray-200 mb-3 leading-relaxed flex-grow line-clamp-3 sm:line-clamp-4">
            {item.description}
          </p>
        )}
        
        {!isPackageOffer && (
          <div className="text-xs text-gray-300 space-y-1.5 mb-4 border-t border-white/10 pt-3 mt-auto">
            {item.duration && <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-amber-400/80" /> Duration: {item.duration}</p>}
            {item.price && <p className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1.5 text-amber-400/80" /> Price: {item.price}</p>}
          </div>
        )}

         <Button 
            onClick={() => onSelectService(item)}
            className="w-full bg-amber-500/80 hover:bg-amber-500 text-black font-semibold mt-auto transition-colors text-sm py-2.5"
          >
            {isPackageOffer ? "Request Package" : "Select Service"}
          </Button>
      </div>
    </motion.div>
  );
};

export default WellnessServiceCard;