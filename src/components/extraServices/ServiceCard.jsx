import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Clock } from 'lucide-react';

const ServiceCard = ({ offer, onSelectService, index }) => {
  const IconComponent = offer.icon;
  const isPriceContact = offer.price === "Contact us for more details";

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-card rounded-xl shadow-lg overflow-hidden flex flex-col h-full border border-border/30 hover:shadow-2xl transition-shadow duration-300 group"
    >
      <div className="relative h-64 sm:h-72 overflow-hidden">
        <img 
          src={offer.image}
          alt={offer.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {IconComponent && (
            <div className="absolute top-4 left-4 bg-primary/80 text-primary-foreground p-3 rounded-full shadow-md">
            <IconComponent className="w-6 h-6" />
            </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-semibold text-heading-foreground group-hover:text-primary transition-colors mb-3">{offer.title}</h3>
        <p className="text-paragraph-foreground text-sm mb-4 flex-grow">{offer.description}</p>
        
        {offer.duration && (
          <div className="flex items-center text-sm text-muted-foreground mb-3">
            <Clock className="w-4 h-4 mr-1.5" />
            <span>{offer.duration}</span>
          </div>
        )}

        <div className="mb-4">
          {(offer.tags || []).map(tag => (
            <span key={tag} className="inline-block bg-secondary/10 text-secondary-dark text-xs font-medium mr-2 mb-2 px-2.5 py-1 rounded-full">{tag}</span>
          ))}
        </div>
        
        <div className="flex justify-between items-center mb-4">
          {isPriceContact ? (
            <p className="text-sm font-medium text-primary">{offer.price}</p>
          ) : (
            <p className="text-lg font-semibold text-primary">{offer.price}</p>
          )}
        </div>
        
        <Button 
          variant="outline" 
          className="mt-auto w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          onClick={() => onSelectService(offer)}
        >
          Request This Service
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;