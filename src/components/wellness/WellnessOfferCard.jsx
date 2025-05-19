import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Sparkles, Utensils, Plane, Clock, Tag, Users, Check, Bath as Spa, Brain, Package as PackageIcon } from 'lucide-react';
import { Link } from "react-router-dom";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (
    url.startsWith('https://i.postimg.cc') || 
    url.startsWith('http://') || 
    url.startsWith('https://') 
  );
};
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const iconMapping = {
  default: Sparkles,
  culinary: Utensils,
  transport: Plane,
  spa: Spa, 
  workshop: Brain, 
  package: PackageIcon, 
  holistic: Spa,
};

const formatPrice = (price) => {
  if (typeof price === 'number') {
    return `Starting from ${price.toLocaleString('vi-VN')} VND`;
  }
  if (typeof price === 'string') {
    if (price.toLowerCase().startsWith('starting from') || price.toLowerCase().startsWith('from') || price.toLowerCase().includes('varies') || price.toLowerCase().includes('complimentary')) {
      return price;
    }
    const numericValue = parseInt(price.replace(/[^0-9]/g, ''), 10);
    if (!isNaN(numericValue)) {
      return `Starting from ${numericValue.toLocaleString('vi-VN')} VND`;
    }
  }
  return price; 
};


const WellnessOfferCard = ({ offer, index, type = "default", className = "", onSelectService }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, delay: index * 0.08, ease: "easeOut" } 
    }
  };

  const IconComponent = offer.icon || iconMapping[type] || iconMapping[offer.type] || iconMapping.default;
  
  const primaryImage = offer.image_url || offer.image;
  
  let displayImage = null;
  if (primaryImage && isValidImageUrl(primaryImage)) {
    displayImage = primaryImage;
  } else if (type !== "extra" && type !== "package") {
    displayImage = placeholderImage;
  }


  const handleSelect = () => {
    if (onSelectService) {
      onSelectService(offer);
    }
  };

  const serviceCategory = offer.category || type;
  const displayPrice = formatPrice(offer.price);

  return (
    <motion.div 
      variants={cardVariants}
      className={`h-full ${className}`}
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-xl hover-lift border border-border/40 hover:border-primary/50 transition-all group bg-card/80 backdrop-blur-sm">
        {displayImage && (
          <div className="relative overflow-hidden h-52">
            <img
              src={displayImage}
              alt={offer.title || offer.name || "Wellness Offer"}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10"></div>
            {IconComponent && (
              <div className="absolute top-3 left-3 p-2 bg-primary/80 backdrop-blur-sm rounded-full text-primary-foreground shadow-md">
                <IconComponent className="w-5 h-5" />
              </div>
            )}
          </div>
        )}
        <CardHeader className="pb-2 pt-4">
          <CardTitle className={`text-lg font-serif text-heading-foreground group-hover:text-primary transition-colors line-clamp-2 ${!displayImage ? 'pt-2' : ''}`}>
            {offer.title || offer.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow pt-1">
          <p className="text-sm text-paragraph-foreground mb-3 leading-relaxed line-clamp-none">
            {offer.description}
          </p>
          
          {(offer.duration || offer.duration_minutes || displayPrice || offer.targetAudience || (offer.descriptionItems && offer.descriptionItems.length > 0)) && (
            <div className="text-xs text-muted-foreground space-y-1 mb-2 border-t border-border/20 pt-2.5">
              {(offer.duration || offer.duration_minutes) && <p className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1.5 text-primary/80" /> Duration: {offer.duration || `${offer.duration_minutes} minutes`}</p>}
              {displayPrice && <p className="flex items-center"><Tag className="w-3.5 h-3.5 mr-1.5 text-primary/80" /> Price: {displayPrice}</p>}
              {offer.targetAudience && <p className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary/80" /> Ideal for: {offer.targetAudience}</p>}
              {offer.descriptionItems && offer.descriptionItems.map((descItem, idx) => (
                <p key={idx} className="flex items-start">
                  <Check className="w-3.5 h-3.5 mr-1.5 mt-0.5 text-green-500/90 flex-shrink-0" /> 
                  {descItem}
                </p>
              ))}
            </div>
          )}

        </CardContent>
        <CardFooter className="pt-2 pb-4 border-t border-border/20 bg-muted/10">
          {onSelectService ? (
             <Button 
              onClick={handleSelect}
              className="w-full bg-gradient-button text-white shadow-md hover:shadow-lg"
            >
              {serviceCategory === "Wellness Packages" ? "Request Package" : "Select Service"} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Link to={offer.detailsLink || `/wellness-details?serviceId=${offer.id}&category=${encodeURIComponent(serviceCategory)}`} className="w-full">
              <Button 
                className="w-full bg-gradient-button text-white shadow-md hover:shadow-lg"
              >
                View Details <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default WellnessOfferCard;