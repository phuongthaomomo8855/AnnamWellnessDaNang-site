import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Camera } from 'lucide-react';

const NoMomentsFound = ({ onClearFilters }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <Camera className="w-20 h-20 mx-auto text-muted-foreground/50 mb-6" />
      <h3 className="text-2xl font-semibold text-heading-foreground mb-2">No Moments Found</h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        It seems there are no moments matching your current search or filter. Try adjusting your criteria or explore all our beautiful captures!
      </p>
      <Button 
        variant="outline" 
        className="mt-6 border-primary text-primary hover:bg-primary/5"
        onClick={onClearFilters}
      >
        Clear Filters & Search
      </Button>
    </motion.div>
  );
};

export default NoMomentsFound;