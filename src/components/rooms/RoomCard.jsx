import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Users, ArrowRight, CheckCircle, Maximize2, Eye } from "lucide-react";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (
    url.startsWith('https://i.postimg.cc') || 
    url.startsWith('http://') || 
    url.startsWith('https://') 
  );
};
const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const RoomCard = ({ room, index, checkInDate, checkOutDate, numAdults, numChildren, numRoomsQuery }) => {
  const cardAnimation = {
    initial: { opacity: 0, y: 50, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1 },
    transition: { duration: 0.5, delay: index * 0.07, ease: "easeOut" }
  };

  const imageUrl = room.images && room.images.length > 0 && isValidImageUrl(room.images[0]) 
    ? room.images[0] 
    : placeholderImage;

  const priceToDisplay = room.displayPriceVND 
    ? room.displayPriceVND 
    : (room.price_per_night ? `${room.price_per_night.toLocaleString('vi-VN')} VND` : 'N/A');

  return (
    <motion.div
      key={room.id || room.slug}
      variants={cardAnimation}
      initial="initial"
      animate="animate"
      className="h-full"
    >
      <Card className="h-full flex flex-col overflow-hidden shadow-xl hover-lift border border-border/40 hover:border-primary/50 transition-all group">
        <div className="relative overflow-hidden">
          <img
            src={imageUrl}
            alt={`Image of ${room.name}`}
            className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-0 right-0 bg-primary/80 text-primary-foreground px-3 py-1.5 text-xs font-semibold rounded-bl-lg shadow-md">
            From {priceToDisplay}/night
          </div>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl font-serif text-heading-foreground group-hover:text-primary transition-colors">
            {room.name}
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground pt-1">
            <div className="flex items-center mb-1"><Users className="w-4 h-4 mr-1.5 text-secondary" /> Capacity: {room.capacity || 'N/A'}</div>
            <div className="flex items-center mb-1"><Maximize2 className="w-4 h-4 mr-1.5 text-secondary" /> Size: {room.sqm || 'N/A'}</div>
            <div className="flex items-center"><Eye className="w-4 h-4 mr-1.5 text-secondary" /> View: {room.view || 'N/A'}</div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-paragraph-foreground mb-3 line-clamp-3">
            {room.shortDescription || room.description}
          </p>
          {room.amenities && room.amenities.length > 0 && (
            <div className="space-y-1.5 text-xs">
              {room.amenities.slice(0, 3).map(amenity => (
                 <span key={typeof amenity === 'object' ? amenity.id : amenity} className="inline-flex items-center bg-secondary/10 text-secondary-dark px-2 py-0.5 rounded-full mr-1.5 mb-1">
                  <CheckCircle className="w-3 h-3 mr-1" /> {typeof amenity === 'object' ? amenity.label : amenity}
                </span>
              ))}
              {room.amenities.length > 3 && <span className="text-muted-foreground text-xs"> + more</span>}
            </div>
          )}
        </CardContent>
        <CardFooter className="pt-4 border-t border-border/30 bg-muted/20">
          <div className="flex justify-between items-center w-full">
             <Link to={`/rooms/${room.slug}`} className="w-1/2">
              <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/5">
                View Details
              </Button>
            </Link>
            <Link 
              to="/booking" 
              state={{ 
                selectedRoomId: room.slug, 
                checkInDate: checkInDate ? checkInDate.toISOString() : null, 
                checkOutDate: checkOutDate ? checkOutDate.toISOString() : null,
                numAdults,
                numChildren,
                numRooms: numRoomsQuery
              }} 
              className="w-1/2 ml-2"
            >
              <Button className="w-full bg-gradient-button text-white shadow-md hover:shadow-lg">
                Book Now <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default RoomCard;