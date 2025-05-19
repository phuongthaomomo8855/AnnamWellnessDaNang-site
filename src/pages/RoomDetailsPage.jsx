import React, { useState, useEffect, useCallback } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { getRoomBySlug } from "@/data/roomDetailsStaticData";
import RoomDetailsLayout from "@/components/roomDetails/RoomDetailsLayout";
import Lightbox from "@/components/roomDetails/Lightbox";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Loader2 } from "lucide-react";

const pageVariants = {
  initial: { opacity: 0, x: -50 },
  in: { opacity: 1, x: 0 },
  out: { opacity: 0, x: 50 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.7,
};

const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";
const isValidImageUrl = (url) => url && typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://'));

const RoomDetailsPage = () => {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState(null);

  const openLightbox = (imageUrl) => {
    setLightboxImage(imageUrl);
  };
  const closeLightbox = () => {
    setLightboxImage(null);
  };

  const fetchRoomData = useCallback(async (currentRoomId) => {
    setLoading(true);
    setError(null);

    try {
      const staticData = getRoomBySlug(currentRoomId);

      if (!staticData) {
        throw new Error(`Room with slug "${currentRoomId}" not found in static data.`);
      }
      
      let dbRoom = null;
      const { data: dbRoomData, error: dbError } = await supabase
        .from("rooms")
        .select("id, name, slug, price_per_night, capacity, images, description, amenities")
        .eq("slug", currentRoomId)
        .maybeSingle();


      if (dbError && dbError.code !== 'PGRST116') { 
        console.warn("Supabase error when fetching room by slug:", dbError.message);
      }
      
      dbRoom = dbRoomData; 

      let finalRoomData;
      if (dbRoom) {
        finalRoomData = {
          ...staticData,
          id: dbRoom.id || staticData.id,
          name: dbRoom.name || staticData.name,
          subtitle: staticData.subtitle,
          description: dbRoom.description || staticData.description,
          price_per_night: dbRoom.price_per_night !== undefined && dbRoom.price_per_night !== null 
                            ? dbRoom.price_per_night 
                            : (staticData.displayPriceVND ? parseFloat(staticData.displayPriceVND.replace(/[^0-9.-]+/g,"")) : (staticData.basePrice ? staticData.basePrice * 24000 : 0)),
          sqm: staticData.sqm,
          view: staticData.view,
          capacity: dbRoom.capacity || staticData.capacity,
          images: (dbRoom.images && dbRoom.images.length > 0 ? dbRoom.images : staticData.images).map(img => isValidImageUrl(img) ? img : placeholderImage),
          galleryImages: (staticData.galleryImages && staticData.galleryImages.length > 0 ? staticData.galleryImages : (dbRoom.images || staticData.images || [])).map(img => typeof img === 'string' ? img : (img?.src && isValidImageUrl(img.src) ? img.src : placeholderImage)),
          amenities: dbRoom.amenities && dbRoom.amenities.length > 0 
            ? dbRoom.amenities.map(amenity => typeof amenity === 'object' ? amenity : { id: amenity, label: amenity, icon: "Check" }) 
            : staticData.amenities,
          keyFeatures: staticData.keyFeatures || [],
          promotionalOffer: staticData.promotionalOffer || null,
          extraServices: staticData.extraServices || [],
          slug: dbRoom.slug || staticData.slug,
        };
      } else {
        finalRoomData = {
          ...staticData,
          price_per_night: staticData.displayPriceVND ? parseFloat(staticData.displayPriceVND.replace(/[^0-9.-]+/g,"")) : (staticData.basePrice ? staticData.basePrice * 24000 : 0),
          images: (staticData.images && staticData.images.length > 0 ? staticData.images : [placeholderImage]).map(img => isValidImageUrl(img) ? img : placeholderImage),
          galleryImages: (staticData.galleryImages && staticData.galleryImages.length > 0 ? staticData.galleryImages : staticData.images || [placeholderImage]).map(img => typeof img === 'string' ? img : (img?.src && isValidImageUrl(img.src) ? img.src : placeholderImage)),
        };
      }
      
      setRoom(finalRoomData);
      setCurrentImageIndex(0);

    } catch (err) {
      console.error("Error fetching room data:", err);
      setError(err.message || "Failed to load room details. The room may not exist or there was a network issue.");
      toast({
        title: "Error",
        description: err.message || "Could not load room details.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (roomId) {
      fetchRoomData(roomId);
    } else {
      setError("No room ID provided.");
      setLoading(false);
    }
  }, [roomId, fetchRoomData]);


  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[calc(100vh-150px)] p-4 bg-gradient-to-br from-background via-primary/5 to-background">
        <Loader2 className="w-16 h-16 text-primary animate-spin mb-6" />
        <p className="text-xl text-muted-foreground">Loading Room Details...</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="flex flex-col justify-center items-center min-h-[calc(100vh-150px)] p-6 text-center bg-gradient-to-br from-background via-destructive/10 to-background"
      >
        <AlertTriangle className="w-20 h-20 text-destructive mb-6" />
        <h1 className="text-3xl font-bold text-destructive-foreground mb-3">Room Not Found</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-md">
          {error || "We couldn't find the details for this room. It might have been removed or the link is incorrect."}
        </p>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={() => navigate(-1)} className="border-primary text-primary hover:bg-primary/10">
            <ArrowLeft className="mr-2 h-4 w-4" /> Go Back
          </Button>
          <Link to="/rooms">
            <Button className="bg-gradient-button text-white">View All Rooms</Button>
          </Link>
        </div>
      </motion.div>
    );
  }
  
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
    >
      <RoomDetailsLayout 
        room={room} 
        loading={loading}
        error={error}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        lightboxImage={lightboxImage}
        openLightbox={openLightbox}
        closeLightbox={closeLightbox}
      />
      <AnimatePresence>
        {lightboxImage && (
          <Lightbox
            imageUrl={lightboxImage}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default RoomDetailsPage;