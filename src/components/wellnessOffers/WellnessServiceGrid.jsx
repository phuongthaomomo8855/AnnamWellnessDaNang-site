import React from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import WellnessOfferCard from '@/components/wellness/WellnessOfferCard';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card"; // For skeleton

const WellnessServiceGrid = ({ services, viewMode, onSelectService, loading }) => {
  if (loading) {
    return (
      <div className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {[1, 2, 3].map(i => (
          <Card key={i} className="overflow-hidden shadow-lg animate-pulse">
            <div className="w-full h-48 bg-gray-300/70"></div>
            <CardHeader><div className="h-6 bg-gray-300/70 rounded w-3/4"></div></CardHeader>
            <CardContent>
              <div className="h-4 bg-gray-300/70 rounded w-full mb-2"></div>
              <div className="h-4 bg-gray-300/70 rounded w-5/6 mb-3"></div>
              <div className="h-4 bg-gray-300/70 rounded w-1/2"></div>
            </CardContent>
            <CardFooter><div className="h-10 bg-gray-300/70 rounded w-full"></div></CardFooter>
          </Card>
        ))}
      </div>
    );
  }

  if (services.length === 0) {
    return (
      <div className="text-center py-12">
        <Info className="w-16 h-16 mx-auto text-muted-foreground/60 mb-4" />
        <h3 className="text-2xl font-semibold text-heading-foreground mb-2">No Offers Available</h3>
        <p className="text-muted-foreground">
          No services match the current filter. Please try a different category or check back soon!
        </p>
      </div>
    );
  }

  return (
    <motion.div 
      className={`grid gap-6 md:gap-8 ${viewMode === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}
      initial="initial"
      animate="animate"
      variants={{ animate: { transition: { staggerChildren: 0.05 }} }}
    >
      {services.map((service, index) => (
        <WellnessOfferCard 
          key={service.id || service.title}
          offer={{...service, type: service.type || 'spa'}}
          index={index} 
          className={`h-full ${viewMode === 'list' ? 'md:flex md:items-start' : ''}`}
          onSelectService={onSelectService}
        />
      ))}
    </motion.div>
  );
};

export default WellnessServiceGrid;