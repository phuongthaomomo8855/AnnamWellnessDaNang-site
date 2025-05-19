import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Heart } from 'lucide-react';
import { placeholderImage } from '@/data/momentsPageData';

const MomentCard = ({ moment, index, onClick }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
      onClick={onClick}
      className="cursor-pointer"
    >
      <Card className="overflow-hidden group h-full flex flex-col rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border-border/20 hover:border-primary/30">
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={moment.image || placeholderImage}
            alt={moment.title}
            className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
            onError={(e) => e.target.src = placeholderImage}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
             <Heart className="w-5 h-5 text-red-500 fill-current opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100" />
          </div>
           <div className="absolute top-2 right-2 bg-primary/80 text-primary-foreground text-xs px-2 py-0.5 rounded-full backdrop-blur-sm">
            {moment.category}
          </div>
        </div>
        <CardContent className="p-4 flex-grow">
          <h3 className="text-lg font-semibold text-heading-foreground mb-1.5 group-hover:text-primary transition-colors">
            {moment.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{moment.description}</p>
          <div className="flex flex-wrap gap-1.5 mt-auto">
            {moment.tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-secondary text-secondary-foreground px-2 py-0.5 rounded-full">
                #{tag}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MomentCard;