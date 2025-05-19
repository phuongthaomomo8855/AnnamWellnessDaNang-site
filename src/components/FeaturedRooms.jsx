import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { BedDouble, Users, Maximize2, Eye, ArrowRight, Loader2, AlertTriangle, CalendarCheck } from "lucide-react";
import { getAllRoomsStaticData } from "@/data/roomDetailsStaticData"; 
import { supabase } from "@/lib/supabaseClient";

const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const isValidImageUrl = (url) => {
  return url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));
};

const RoomCard = ({ room, index }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: index * 0.1 } }
  };

  const displayImage = room.images && room.images.length > 0 && isValidImageUrl(room.images[0]) 
    ? room.images[0] 
    : placeholderImage;

  const priceToDisplay = room.displayPriceVND || 
                         (room.price_per_night ? `${Number(room.price_per_night).toLocaleString('vi-VN')} VND` : 
                         (room.basePrice ? `${(Number(room.basePrice) * 24000).toLocaleString('vi-VN')} VND` : 'Price unavailable'));


  return (
    <motion.div 
      variants={cardVariants} 
      initial="hidden" 
      whileInView="visible" 
      viewport={{ once: true, amount: 0.2 }}
      className="h-full"
    >
      <Card className="overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 flex flex-col h-full bg-card/80 backdrop-blur-sm border-border/50 hover-lift group">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={displayImage}
            alt={room.name}
            className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
          />
          <div className="absolute top-3 right-3 bg-primary text-primary-foreground px-3 py-1.5 rounded-md text-xs font-semibold shadow-md">
            {priceToDisplay}
          </div>
        </div>
        <CardHeader className="pb-3">
          <CardTitle className="text-xl md:text-2xl font-semibold text-primary-dark group-hover:text-primary transition-colors">
            {room.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
            {room.shortDescription || room.description}
          </p>
          <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-muted-foreground">
            <div className="flex items-center"><Users className="w-3.5 h-3.5 mr-1.5 text-primary/80" /> {room.capacity || "N/A"}</div>
            <div className="flex items-center"><Maximize2 className="w-3.5 h-3.5 mr-1.5 text-primary/80" /> {room.sqm ? `${room.sqm}` : "N/A"}</div>
            <div className="flex items-center col-span-2"><Eye className="w-3.5 h-3.5 mr-1.5 text-primary/80" /> {room.view || "N/A"}</div>
          </div>
        </CardContent>
        <CardFooter className="mt-auto pt-4 flex flex-col sm:flex-row gap-2">
          <Link to={`/rooms/${room.slug}`} className="w-full sm:w-1/2">
            <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary-dark transition-all group-hover:button-glow-effect-subtle">
              View Details <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
          <Link to="/booking" state={{ selectedRoomId: room.slug }} className="w-full sm:w-1/2">
            <Button className="w-full bg-gradient-to-r from-green-500/80 via-teal-600/80 to-stone-500/80 text-white shadow-md hover:shadow-lg hover:from-green-500 hover:via-teal-600 hover:to-stone-500 transition-all duration-300 transform hover:scale-105 button-glow-effect">
              Book Now <CalendarCheck className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const FeaturedRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const allStaticRooms = getAllRoomsStaticData(); 
      try {
        const featuredSlugs = ["deluxe-room", "suite-room", "president-suite"];
        
        const { data: dbRooms, error: dbError } = await supabase
          .from('rooms')
          .select('name, slug, price_per_night, capacity, images, description')
          .in('slug', featuredSlugs);

        if (dbError) throw dbError;

        const fetchedRooms = featuredSlugs.map(slug => {
          const staticRoom = allStaticRooms.find(sr => sr.slug === slug);
          if (!staticRoom) return null; 

          const dbRoomData = dbRooms.find(dbR => dbR.slug === slug);
          
          let finalCapacity = staticRoom.capacity; 
          
          // Override capacity for Deluxe Room specifically for FeaturedRooms display
          if (slug === 'deluxe-room') {
            finalCapacity = "2 Adults, 1 Child";
          } else if (dbRoomData && dbRoomData.capacity) {
             finalCapacity = dbRoomData.capacity;
          }


          if (dbRoomData) {
            return {
              ...staticRoom,
              name: dbRoomData.name || staticRoom.name,
              price_per_night: dbRoomData.price_per_night !== undefined && dbRoomData.price_per_night !== null ? dbRoomData.price_per_night : staticRoom.basePrice,
              displayPriceVND: staticRoom.displayPriceVND,
              capacity: finalCapacity,
              images: (dbRoomData.images && dbRoomData.images.length > 0) ? dbRoomData.images : staticRoom.images,
              description: dbRoomData.description || staticRoom.description,
              shortDescription: staticRoom.shortDescription,
              sqm: staticRoom.sqm, 
              view: staticRoom.view, 
            };
          }
          return {
            ...staticRoom,
            price_per_night: staticRoom.basePrice,
            displayPriceVND: staticRoom.displayPriceVND,
            capacity: finalCapacity,
            shortDescription: staticRoom.shortDescription,
          }; 
        }).filter(room => room !== null); 

        setRooms(fetchedRooms);
      } catch (err) {
        console.error("Error fetching rooms:", err);
        setError("Failed to load room information. Displaying default rooms.");
        const defaultFeaturedRooms = allStaticRooms.filter(sr => ["deluxe-room", "suite-room", "president-suite"].includes(sr.slug))
          .map(sr => {
            let capacity = sr.capacity;
            if (sr.slug === 'deluxe-room') {
              capacity = "2 Adults, 1 Child";
            }
            return {
              ...sr, 
              price_per_night: sr.basePrice,
              displayPriceVND: sr.displayPriceVND,
              capacity: capacity,
              shortDescription: sr.shortDescription,
            };
          });
        setRooms(defaultFeaturedRooms); 
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  if (loading) {
    return (
      <section id="featured-rooms" className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/5 to-background">
        <div className="container-custom text-center">
          <Loader2 className="w-12 h-12 text-primary animate-spin mx-auto" />
          <p className="mt-4 text-muted-foreground">Loading accommodations...</p>
        </div>
      </section>
    );
  }

  return (
    <motion.section 
      id="featured-rooms" 
      className="py-12 md:py-16 bg-gradient-to-b from-background via-secondary/5 to-background"
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      <div className="container-custom">
        <motion.div className="text-center mb-10 md:mb-12" variants={titleVariants}>
          <h2 className="text-4xl md:text-5xl font-serif text-gradient-gold-teal-white mb-3">
            Luxury Accommodations
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of rooms and suites, each designed for ultimate comfort and serene relaxation.
          </p>
        </motion.div>

        {error && (
          <div className="text-center mb-8 p-4 bg-red-100 border border-red-300 text-red-700 rounded-md flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 mr-2" />
            {error}
          </div>
        )}

        {rooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {rooms.map((room, index) => (
              <RoomCard key={room.slug || room.id} room={room} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
            <p className="text-xl text-muted-foreground">No accommodations available at this moment. Please check back later.</p>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default FeaturedRooms;