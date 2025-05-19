import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from "@/components/ui/badge";
import { Maximize2, Users, Eye } from 'lucide-react';

const RoomHeader = ({ name, subtitle, sqm, view, capacity }) => {
  const slideUp = { initial: { opacity: 0, y:20 }, animate: { opacity: 1, y:0 }, transition: { duration: 0.6, ease:"easeOut" } };
  
  const formatSqm = (sqmValue) => {
    if (!sqmValue) return null;
    if (typeof sqmValue === 'number') return `${sqmValue}m²`;
    if (typeof sqmValue === 'string' && !sqmValue.toLowerCase().includes('sqm') && !sqmValue.endsWith('m²') && !isNaN(parseFloat(sqmValue))) return `${parseFloat(sqmValue)}sqm`;
    return sqmValue;
  };

  const formattedSqm = formatSqm(sqm);

  return (
    <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6 lg:p-8 bg-gradient-to-t from-black/70 via-black/40 to-transparent">
      <div className="container-custom">
        <motion.h1 {...slideUp} className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif mb-2 md:mb-3 text-white text-shadow-strong">
          {name || "Room Name Unavailable"}
        </motion.h1>
        {subtitle && (
           <motion.p {...slideUp} transition={{delay:0.05}} className="text-sm sm:text-base md:text-lg text-gray-200 mb-3 md:mb-4 max-w-3xl text-shadow-soft">
            {subtitle}
          </motion.p>
        )}
        <motion.div {...slideUp} transition={{delay:0.1}} className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs sm:text-sm md:text-base">
          {formattedSqm && <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-white/30 px-3 py-1.5 shadow-md flex items-center"><Maximize2 className="w-3.5 h-3.5 mr-1.5" /> {formattedSqm}</Badge>}
          {view && <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-white/30 px-3 py-1.5 shadow-md flex items-center"><Eye className="w-3.5 h-3.5 mr-1.5" /> {view}</Badge>}
          {capacity && <Badge variant="secondary" className="bg-black/50 text-white backdrop-blur-sm border-white/30 px-3 py-1.5 shadow-md flex items-center"><Users className="w-3.5 h-3.5 mr-1.5" /> {capacity}</Badge>}
        </motion.div>
      </div>
    </div>
  );
};

export default RoomHeader;