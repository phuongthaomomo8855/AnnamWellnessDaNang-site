import React from 'react';
import { AnimatePresence } from 'framer-motion';
import MomentCard from '@/components/moments/MomentCard';

const MomentsGrid = ({ moments, onMomentClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
      <AnimatePresence>
        {moments.map((moment, index) => (
          <MomentCard 
            key={moment.id} 
            moment={moment} 
            index={index} 
            onClick={() => onMomentClick(moment.image)} 
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default MomentsGrid;