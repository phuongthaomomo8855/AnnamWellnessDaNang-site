import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Loader2, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import RoomImageGallery from '@/components/roomDetails/RoomImageGallery';
// Lightbox is now handled in RoomDetailsPage.jsx
// import Lightbox from '@/components/roomDetails/Lightbox';
import BookingSidebar from '@/components/roomDetails/BookingSidebar';
import RoomDetailsMainContent from '@/components/roomDetails/RoomDetailsMainContent';
import RoomExtraServicesSection from '@/components/roomDetails/RoomExtraServicesSection';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNavigate } from 'react-router-dom';

const placeholderImage = "https://i.postimg.cc/Fs7Gf0b2/placeholder-room.webp";

const RoomDetailsLayout = ({ room, loading, error, currentImageIndex, setCurrentImageIndex, openLightbox /*, closeLightbox, lightboxImage - removed */ }) => {
  const navigate = useNavigate();

  const handleNextImage = () => {
    if (room && room.images && room.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % room.images.length);
    }
  };

  const handlePrevImage = () => {
    if (room && room.images && room.images.length > 0) {
      setCurrentImageIndex((prevIndex) => (prevIndex - 1 + room.images.length) % room.images.length);
    }
  };

  const navigateToRoomsPage = () => {
    navigate('/rooms'); 
  };


  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] bg-gradient-to-br from-background via-primary/5 to-background p-8">
        <Loader2 className="h-16 w-16 text-primary animate-spin mb-6" />
        <h2 className="text-2xl font-semibold text-foreground mb-2">Loading Room Details...</h2>
        <p className="text-muted-foreground">Please wait while we prepare your sanctuary.</p>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-72px)] bg-gradient-to-br from-red-50 via-red-100/50 to-red-50 p-8 text-center">
        <AlertTriangle className="h-16 w-16 text-red-500 mb-6" />
        <h2 className="text-2xl font-semibold text-red-700 mb-2">Oops! Room Not Found</h2>
        <p className="text-red-600 mb-6 max-w-md">
          We couldn't find the details for this room. It might be unavailable or the link might be incorrect.
          {error && <span className="block text-xs mt-2">Error: {typeof error === 'string' ? error : JSON.stringify(error)}</span>}
        </p>
        <Button onClick={() => navigate('/')} variant="destructive" className="bg-red-600 hover:bg-red-700 text-white">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Button>
      </div>
    );
  }

  const activeImages = room.images && room.images.length > 0 ? room.images : [placeholderImage];
  const STICKY_HEADER_HEIGHT = "72px"; 
  const STICKY_SUB_HEADER_HEIGHT_NUM = 65; 
  const SIDEBAR_STICKY_TOP_CALC = `calc(${STICKY_HEADER_HEIGHT} + ${STICKY_SUB_HEADER_HEIGHT_NUM}px + 16px)`;


  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="bg-gradient-to-br from-background via-primary/5 to-background"
    >
      <div 
        className="sticky bg-background/80 backdrop-blur-md shadow-sm py-3 px-4 md:px-6 border-b border-border/30 z-20"
        style={{ top: STICKY_HEADER_HEIGHT }} 
      >
        <div className="container-custom flex items-center justify-between h-[calc(var(--sub-header-height,65px))]" style={{ '--sub-header-height': `${STICKY_SUB_HEADER_HEIGHT_NUM}px` }}>
            <Button variant="outline" onClick={navigateToRoomsPage} className="group text-sm">
                <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
                Back to All Accommodations
            </Button>
            <div className="hidden md:block text-center">
                <h1 className="text-xl lg:text-2xl font-serif text-gradient-gold-teal truncate max-w-md lg:max-w-xl">
                    {room.name || "Room Details"}
                </h1>
            </div>
             <a href="#booking-sidebar">
              <Button className="bg-gradient-button text-white button-glow-effect text-sm">
                Book Now
              </Button>
            </a>
        </div>
      </div>

      <RoomImageGallery
        images={activeImages}
        roomName={room.name}
        currentImageIndex={currentImageIndex}
        setCurrentImageIndex={setCurrentImageIndex}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        onImageClick={openLightbox} 
        subtitle={room.subtitle}
        sqm={room.sqm}
        view={room.view}
        capacity={room.capacity}
      />
      
      <div className="container-custom py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          <ScrollArea 
            className="lg:w-3/5 xl:w-2/3 h-auto lg:max-h-[calc(100vh-var(--navbar-height)-var(--sub-header-height)-32px)] pr-2" 
            style={{ '--navbar-height': STICKY_HEADER_HEIGHT, '--sub-header-height': `${STICKY_SUB_HEADER_HEIGHT_NUM}px`}}
          >
             <RoomDetailsMainContent room={room} onImageClick={openLightbox} />
          </ScrollArea>

          <aside 
            id="booking-sidebar" 
            className="lg:w-2/5 xl:w-1/3 h-fit lg:sticky"
            style={{ top: SIDEBAR_STICKY_TOP_CALC }}
          >
            <BookingSidebar room={room} />
            {room.extraServices && room.extraServices.length > 0 && (
              <div className="mt-8 bg-card p-6 sm:p-8 rounded-xl shadow-lg border border-border/50">
                <RoomExtraServicesSection services={room.extraServices} roomId={room.id} />
              </div>
            )}
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default RoomDetailsLayout;