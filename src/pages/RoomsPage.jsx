import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { CalendarX2, AlertTriangle, Search } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import RoomCard from "@/components/rooms/RoomCard";
import AvailabilityForm from "@/components/rooms/AvailabilityForm";
import { fetchAndEnrichRooms } from "@/lib/roomUtils";
import RoomCardSkeleton from "@/components/rooms/RoomCardSkeleton";
import { Button } from "@/components/ui/button";


const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.6,
};

const desiredRoomSlugs = ["deluxe-room", "suite-room", "president-suite"];

const RoomsPage = () => {
  const location = useLocation();
  const { toast } = useToast();
  const [allRooms, setAllRooms] = useState([]); 
  const [displayedRooms, setDisplayedRooms] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const initialSearchParams = location.state || {};
  const [checkInDate, setCheckInDate] = useState(initialSearchParams.checkInDate ? new Date(initialSearchParams.checkInDate) : null);
  const [checkOutDate, setCheckOutDate] = useState(initialSearchParams.checkOutDate ? new Date(initialSearchParams.checkOutDate) : null);
  const [numAdults, setNumAdults] = useState(initialSearchParams.numAdults || 2);
  const [numChildren, setNumChildren] = useState(initialSearchParams.numChildren || 0);
  const [numRoomsQuery, setNumRoomsQuery] = useState(initialSearchParams.numRooms || 1); 

  const loadRooms = useCallback(async (isRetry = false) => {
    setLoading(true);
    setError(null);
    try {
      let finalRoomList = await fetchAndEnrichRooms(isRetry);
      finalRoomList = finalRoomList.filter(room => desiredRoomSlugs.includes(room.slug));
      setAllRooms(finalRoomList);
      setDisplayedRooms(finalRoomList); 
    } catch (err) {
      setError(err.message);
      toast({
        title: "Error Fetching Rooms",
        description: "Could not load room data. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const handleCheckAvailability = useCallback(() => {
    if (checkInDate && checkOutDate && new Date(checkOutDate) <= new Date(checkInDate)) {
      toast({ title: "Invalid Dates", description: "Check-out date must be after check-in date.", variant: "destructive" });
      return;
    }
    
    const filteredRooms = allRooms.filter(room => {
      if (!desiredRoomSlugs.includes(room.slug)) return false;

      const capacityString = typeof room.capacity === 'string' ? room.capacity : "0 Adults";
      
      const adultCapacityMatch = capacityString.match(/(\d+)\s*Adults?/i);
      const roomAdultCapacity = adultCapacityMatch ? parseInt(adultCapacityMatch[1], 10) : 0;
      
      const childCapacityMatch = capacityString.match(/(\d+)\s*Child(?:ren)?/i);
      let roomChildCapacity = childCapacityMatch ? parseInt(childCapacityMatch[1], 10) : 0;
      
      const orChildCapacityMatch = capacityString.match(/or\s*(\d+)\s*Adults?,\s*(\d+)\s*Child(?:ren)?/i);
      if (orChildCapacityMatch) {
        const altAdultCapacity = parseInt(orChildCapacityMatch[1], 10);
        const altChildCapacity = parseInt(orChildCapacityMatch[2], 10);
        if (parseInt(numAdults, 10) === altAdultCapacity) {
          roomChildCapacity = Math.max(roomChildCapacity, altChildCapacity);
        }
      }
      
      const totalGuests = parseInt(numAdults, 10) + parseInt(numChildren, 10);
      const roomTotalCapacity = roomAdultCapacity + roomChildCapacity;

      return roomTotalCapacity >= totalGuests && roomAdultCapacity >= parseInt(numAdults, 10) && roomChildCapacity >= parseInt(numChildren, 10);
    });

    setDisplayedRooms(filteredRooms); 

    if (filteredRooms.length > 0) {
       toast({ title: "Availability Updated", description: `${filteredRooms.length} room(s) match your criteria.`, variant: "default" });
    } else if (!loading) {
       toast({ title: "No Rooms Found", description: "No rooms match your current criteria. Try adjusting your search.", variant: "default" });
    }
  }, [checkInDate, checkOutDate, numAdults, numChildren, allRooms, toast, loading]);
  
  useEffect(() => {
    if (initialSearchParams.checkInDate || initialSearchParams.checkOutDate || initialSearchParams.numAdults) {
      if (allRooms.length > 0) { 
          handleCheckAvailability();
      }
    }
  }, [allRooms.length, initialSearchParams, handleCheckAvailability]); 


  if (error && !loading) { 
    return (
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="in"
        exit="out"
        transition={pageTransition}
        className="flex flex-col justify-center items-center min-h-screen p-4 bg-gradient-to-b from-background via-destructive/5 to-background"
      >
        <AlertTriangle className="w-16 h-16 text-destructive mb-4" />
        <h2 className="text-2xl font-semibold text-destructive-foreground mb-2">Failed to Load Accommodations</h2>
        <p className="text-muted-foreground mb-6 text-center max-w-md">{error}</p>
        <Button onClick={() => loadRooms(true)} variant="destructive" size="lg">
          <Search className="w-4 h-4 mr-2" /> Try Again
        </Button>
      </motion.div>
    );
  }

  const isLoadingData = loading && !allRooms.length;
  const noRoomsFound = displayedRooms.length === 0 && !loading && !error;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="bg-gradient-to-b from-background via-primary/5 to-background min-h-screen section-padding"
    >
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center mb-10 md:mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-serif text-gradient-gold-teal-white mb-3">
            Luxury Accommodations
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our curated selection of rooms and suites, each designed for ultimate comfort and serene relaxation.
          </p>
        </motion.div>

        <AvailabilityForm 
          checkInDate={checkInDate}
          setCheckInDate={setCheckInDate}
          checkOutDate={checkOutDate}
          setCheckOutDate={setCheckOutDate}
          numAdults={numAdults}
          setNumAdults={setNumAdults}
          numChildren={numChildren}
          setNumChildren={setNumChildren}
          onCheckAvailability={handleCheckAvailability}
          loading={isLoadingData}
        />

        {isLoadingData ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[1,2,3].map(i => <RoomCardSkeleton key={i}/>)}
          </div>
        ) : noRoomsFound ? (
           <div className="text-center py-10 bg-card/50 backdrop-blur-sm rounded-xl p-8 shadow-lg border border-border/30">
            <CalendarX2 className="w-16 h-16 mx-auto text-primary/70 mb-4" />
            <h3 className="text-2xl font-semibold text-heading-foreground mb-2">No Accommodations Found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any rooms matching your current search criteria.
            </p>
            <Button onClick={() => {
                const allAvailableRooms = allRooms.filter(room => desiredRoomSlugs.includes(room.slug));
                setDisplayedRooms(allAvailableRooms); 
                toast({title: "Filters Cleared", description:"Showing all available accommodations."})
              }} 
              variant="outline" className="text-primary border-primary hover:bg-primary/10">
              View All Accommodations
            </Button>
          </div>
        ) : (
          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            initial="initial"
            animate="animate"
            variants={{ animate: { transition: { staggerChildren: 0.05 }} }}
          >
            {displayedRooms.map((room, index) => (
              <RoomCard 
                key={room.id || room.slug} 
                room={room} 
                index={index}
                checkInDate={checkInDate}
                checkOutDate={checkOutDate}
                numAdults={numAdults}
                numChildren={numChildren}
                numRoomsQuery={numRoomsQuery}
              />
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default RoomsPage;